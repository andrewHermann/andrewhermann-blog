
const SERVER_VERSION = "2.0.0";
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', `http://${process.env.ADMIN_SERVER_IP || 'localhost'}:5000`, 'https://andrew.cloudhopper.ch'],
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-dev-secret-not-for-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Database initialization
const db = new sqlite3.Database('./blog.db');

// Create tables
db.serialize(() => {
  // Blog posts table
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      slug TEXT UNIQUE NOT NULL,
      published BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Admin users table with roles
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'reader',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create default admin user
  const defaultPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'CHANGE_ME_IMMEDIATELY', 10);
  db.run(`
    INSERT OR IGNORE INTO admin_users (username, password_hash, role) 
    VALUES ('admin', ?, 'admin')
  `, [defaultPassword]);
});

// Helper functions
const requireAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.session.isAuthenticated && req.session.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

const requireBlogger = (req, res, next) => {
  if (req.session.isAuthenticated && (req.session.userRole === 'admin' || req.session.userRole === 'blogger')) {
    next();
  } else {
    res.status(403).json({ error: 'Blogger or admin access required' });
  }
};

// Authentication endpoints
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.isAuthenticated = true;
    req.session.userId = user.id;
    req.session.userRole = user.role;
    req.session.username = user.username;
    res.json({ message: 'Login successful', role: user.role, username: user.username });
  });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

app.get('/api/admin/check-auth', (req, res) => {
  if (req.session.isAuthenticated) {
    res.json({ 
      authenticated: true, 
      role: req.session.userRole,
      username: req.session.username 
    });
  } else {
    res.json({ authenticated: false });
  }
});

// User management endpoints
app.get('/api/admin/users', requireAdmin, (req, res) => {
  db.all('SELECT id, username, email, role, created_at, updated_at FROM admin_users ORDER BY created_at DESC', (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(users);
  });
});

app.get('/api/admin/users/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  db.get('SELECT id, username, email, role, created_at, updated_at FROM admin_users WHERE id = ?', [id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

app.post('/api/admin/users', requireAdmin, (req, res) => {
  const { username, email, password, role } = req.body;
  
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' });
  }
  
  const validRoles = ['admin', 'blogger', 'reader'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  
  const passwordHash = bcrypt.hashSync(password, 10);
  
  db.run('INSERT INTO admin_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [username, email || null, passwordHash, role],
    function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'User created successfully', userId: this.lastID });
    }
  );
});

app.put('/api/admin/users/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  
  if (!username || !role) {
    return res.status(400).json({ error: 'Username and role are required' });
  }
  
  const validRoles = ['admin', 'blogger', 'reader'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  
  db.run('UPDATE admin_users SET username = ?, email = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [username, email || null, role, id],
    function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});

app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT COUNT(*) as count FROM admin_users WHERE role = "admin"', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.count <= 1) {
      db.get('SELECT role FROM admin_users WHERE id = ?', [id], (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        if (user && user.role === 'admin') {
          return res.status(400).json({ error: 'Cannot delete the last admin user' });
        }
        deleteUser();
      });
    } else {
      deleteUser();
    }
    
    function deleteUser() {
      db.run('DELETE FROM admin_users WHERE id = ?', [id], function (err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      });
    }
  });
});

// Blog post endpoints
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC', (err, posts) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(posts);
  });
});

app.get('/api/posts/:slug', (req, res) => {
  const { slug } = req.params;
  db.get('SELECT * FROM posts WHERE slug = ? AND published = 1', [slug], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  });
});

// Admin blog post endpoints
app.get('/api/admin/posts', requireBlogger, (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, posts) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(posts);
  });
});

app.get('/api/admin/posts/:id', requireBlogger, (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  });
});

app.post('/api/admin/posts', requireBlogger, (req, res) => {
  const { title, content, excerpt, slug, published, created_at, updated_at } = req.body;
  
  const createdAt = created_at || new Date().toISOString();
  const updatedAt = updated_at || new Date().toISOString();
  
  db.run('INSERT INTO posts (title, content, excerpt, slug, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, content, excerpt, slug, published, createdAt, updatedAt],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Post created successfully', postId: this.lastID });
    }
  );
});

app.put('/api/admin/posts/:id', requireBlogger, (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, slug, published, created_at, updated_at } = req.body;
  
  const updatedAtFinal = updated_at || new Date().toISOString();
  
  db.run('UPDATE posts SET title = ?, content = ?, excerpt = ?, slug = ?, published = ?, created_at = ?, updated_at = ? WHERE id = ?',
    [title, content, excerpt, slug, published, created_at, updatedAtFinal, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Post updated successfully' });
    }
  );
});

app.delete('/api/admin/posts/:id', requireBlogger, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Post deleted successfully' });
  });
});

// Change password endpoint
app.post('/api/admin/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.session.userId;
  
  db.get('SELECT * FROM admin_users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    const newPasswordHash = bcrypt.hashSync(newPassword, 10);
    
    db.run('UPDATE admin_users SET password_hash = ? WHERE id = ?', [newPasswordHash, userId], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Password changed successfully' });
    });
  });
});

// Dynamic sitemap generation endpoint
app.get('/api/sitemap', (req, res) => {
  // Get the base URL from environment or default
  const baseUrl = process.env.BASE_URL || 'https://andrew.cloudhopper.ch';
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/portfolio', priority: '0.9', changefreq: 'monthly' },
    { url: '/about', priority: '0.9', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/markets', priority: '0.6', changefreq: 'monthly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.3', changefreq: 'yearly' }
  ];
  
  // Get published blog posts
  db.all('SELECT slug, created_at, updated_at FROM posts WHERE published = 1 ORDER BY created_at DESC', (err, posts) => {
    if (err) {
      console.error('Database error generating sitemap:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
    
    // Add static pages
    staticPages.forEach(page => {
      const lastmod = new Date().toISOString().split('T')[0]; // Today's date
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });
    
    // Add blog posts
    posts.forEach(post => {
      const lastmod = new Date(post.updated_at || post.created_at).toISOString().split('T')[0];
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
    
    sitemap += '\n</urlset>\n';
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  });
});

// Endpoint to regenerate static sitemap file
app.post('/api/admin/regenerate-sitemap', requireBlogger, (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  // Generate sitemap content
  const baseUrl = process.env.BASE_URL || 'https://andrew.cloudhopper.ch';
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/portfolio', priority: '0.9', changefreq: 'monthly' },
    { url: '/about', priority: '0.9', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/markets', priority: '0.6', changefreq: 'monthly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.3', changefreq: 'yearly' }
  ];
  
  db.all('SELECT slug, created_at, updated_at FROM posts WHERE published = 1 ORDER BY created_at DESC', (err, posts) => {
    if (err) {
      console.error('Database error regenerating sitemap:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
    
    // Add static pages
    staticPages.forEach(page => {
      const lastmod = new Date().toISOString().split('T')[0];
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });
    
    // Add blog posts
    posts.forEach(post => {
      const lastmod = new Date(post.updated_at || post.created_at).toISOString().split('T')[0];
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
    
    sitemap += '\n</urlset>\n';
    
    // Write to public/sitemap.xml
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFile(sitemapPath, sitemap, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing sitemap file:', writeErr);
        return res.status(500).json({ error: 'Error writing sitemap file' });
      }
      
      console.log('Sitemap regenerated successfully');
      res.json({ 
        message: 'Sitemap regenerated successfully', 
        postsIncluded: posts.length,
        staticPages: staticPages.length 
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
