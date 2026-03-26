/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


require("dotenv").config();

if (!process.env.SESSION_SECRET) {
  console.error('FATAL: SESSION_SECRET environment variable is not set.');
  process.exit(1);
}

const SERVER_VERSION = "2.0.0";
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const rateLimit = require('express-rate-limit');
const path = require('path');
const cors = require('cors');
const UAParser = require('ua-parser-js');

const app = express();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';

// Trust nginx proxy so req.secure reflects the original protocol (HTTPS via Cloudflare/nginx)
app.set('trust proxy', 1);

// Rate limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  ...(process.env.ADMIN_SERVER_IP
    ? [`http://${process.env.ADMIN_SERVER_IP}:5000`]
    : []),
  'https://andrew.cloudhopper.ch',
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Session configuration with persistent SQLite store
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: path.join(__dirname) }),
  cookie: {
    secure: 'auto',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// CSRF defense-in-depth: require custom header on all state-changing admin requests.
// Primary protection is sameSite=strict on the session cookie; this is an extra layer.
const requireXRequestedWith = (req, res, next) => {
  if (req.headers['x-requested-with'] !== 'XMLFetch') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

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

  // Excluded visitor IDs (owner's own devices)
  db.run(`
    CREATE TABLE IF NOT EXISTS excluded_visitors (
      visitor_id TEXT PRIMARY KEY,
      label TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Page views analytics table
  db.run(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      referrer TEXT,
      visitor_id TEXT,
      session_id TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      country TEXT,
      region TEXT,
      city TEXT,
      org TEXT,
      browser TEXT,
      browser_version TEXT,
      os TEXT,
      device_type TEXT,
      language TEXT,
      screen_width INTEGER,
      screen_height INTEGER,
      asn TEXT,
      isp TEXT,
      is_proxy INTEGER DEFAULT 0,
      is_hosting INTEGER DEFAULT 0,
      traffic_type TEXT DEFAULT 'unknown',
      sec_fetch_site TEXT,
      sec_fetch_mode TEXT,
      sec_fetch_dest TEXT,
      timezone TEXT
    )
  `);

  // Schema migrations for existing production DB (silently ignored if columns already exist)
  const migrations = [
    `ALTER TABLE page_views ADD COLUMN asn TEXT`,
    `ALTER TABLE page_views ADD COLUMN isp TEXT`,
    `ALTER TABLE page_views ADD COLUMN is_proxy INTEGER DEFAULT 0`,
    `ALTER TABLE page_views ADD COLUMN is_hosting INTEGER DEFAULT 0`,
    `ALTER TABLE page_views ADD COLUMN traffic_type TEXT DEFAULT 'unknown'`,
    `ALTER TABLE page_views ADD COLUMN sec_fetch_site TEXT`,
    `ALTER TABLE page_views ADD COLUMN sec_fetch_mode TEXT`,
    `ALTER TABLE page_views ADD COLUMN sec_fetch_dest TEXT`,
    `ALTER TABLE page_views ADD COLUMN timezone TEXT`,
  ];
  migrations.forEach(sql => db.run(sql, () => {}));

  // Scan attempts — path probing by scanners and crawlers
  db.run(`
    CREATE TABLE IF NOT EXISTS scan_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      method TEXT,
      user_agent TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      country TEXT,
      asn TEXT,
      org TEXT
    )
  `);

  // Page duration records — one row per page leave event, capped at 15 min
  db.run(`
    CREATE TABLE IF NOT EXISTS page_durations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT,
      session_id TEXT,
      page TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
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
app.post('/api/admin/login', loginLimiter, (req, res) => {
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
app.get('/api/admin/users', adminLimiter, requireAdmin, (req, res) => {
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

app.post('/api/admin/users', adminLimiter, requireXRequestedWith, requireAdmin, (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' });
  }
  if (typeof username !== 'string' || username.length < 3 || username.length > 32 || !/^[a-zA-Z0-9_-]+$/.test(username)) {
    return res.status(400).json({ error: 'Username must be 3–32 alphanumeric characters' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
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

app.put('/api/admin/users/:id', adminLimiter, requireXRequestedWith, requireAdmin, (req, res) => {
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

app.delete('/api/admin/users/:id', adminLimiter, requireXRequestedWith, requireAdmin, (req, res) => {
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

app.post('/api/admin/posts', requireXRequestedWith, requireBlogger, (req, res) => {
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

app.put('/api/admin/posts/:id', requireXRequestedWith, requireBlogger, (req, res) => {
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

app.delete('/api/admin/posts/:id', requireXRequestedWith, requireBlogger, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Post deleted successfully' });
  });
});

// Change password endpoint
app.post('/api/admin/change-password', loginLimiter, requireXRequestedWith, requireAuth, (req, res) => {
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
app.post('/api/admin/regenerate-sitemap', requireXRequestedWith, requireBlogger, (req, res) => {
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
      
      res.json({
        message: 'Sitemap regenerated successfully', 
        postsIncluded: posts.length,
        staticPages: staticPages.length 
      });
    });
  });
});

// Precious metals prices proxy
// Fetches futures data from Yahoo Finance with a 5-minute server-side cache
const metalsCache = { data: null, fetchedAt: 0 };
const METALS_CACHE_TTL_MS = 5 * 60 * 1000;

const METALS_MAP = [
  { ticker: 'GC%3DF', name: 'Gold',      symbol: 'XAU' },
  { ticker: 'SI%3DF', name: 'Silver',    symbol: 'XAG' },
  { ticker: 'PL%3DF', name: 'Platinum',  symbol: 'XPT' },
  { ticker: 'PA%3DF', name: 'Palladium', symbol: 'XPD' },
];

app.get('/api/markets/metals', async (req, res) => {
  const now = Date.now();

  if (metalsCache.data && (now - metalsCache.fetchedAt) < METALS_CACHE_TTL_MS) {
    return res.json(metalsCache.data);
  }

  try {
    const results = await Promise.all(METALS_MAP.map(async (m) => {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${m.ticker}?interval=1d&range=2d`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) throw new Error(`Yahoo Finance ${m.name}: ${response.status}`);

      const data = await response.json();
      const meta = data.chart.result[0].meta;
      const price = meta.regularMarketPrice;
      const prevClose = meta.chartPreviousClose;
      const changePercent = prevClose ? ((price - prevClose) / prevClose) * 100 : null;

      return { name: m.name, symbol: m.symbol, price, changePercent };
    }));

    metalsCache.data = { metals: results, fetchedAt: now };
    metalsCache.fetchedAt = now;

    res.json(metalsCache.data);
  } catch (err) {
    console.error('Metals fetch error:', err.message);
    res.status(502).json({ error: 'Failed to fetch metals prices' });
  }
});

// ─── Analytics ────────────────────────────────────────────────────────────────

const geoCache = new Map();
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000;

const trackingLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

const LOCAL_IPS = new Set(['::1', '127.0.0.1', '::ffff:127.0.0.1']);
const isLocalIp = (ip) => LOCAL_IPS.has(ip) || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.');

async function getGeoData(ip) {
  if (!ip || isLocalIp(ip)) return { country: null, region: null, city: null, org: null, asn: null, isp: null, is_proxy: 0, is_hosting: 0 };
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.ts < GEO_CACHE_TTL) return cached.data;
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,org,as,isp,proxy,hosting`, {
      signal: AbortSignal.timeout(3000),
    });
    const geo = await res.json();
    const data = {
      country: geo.country || null,
      region: geo.regionName || null,
      city: geo.city || null,
      org: geo.org || null,
      asn: geo.as || null,
      isp: geo.isp || null,
      is_proxy: geo.proxy ? 1 : 0,
      is_hosting: geo.hosting ? 1 : 0,
    };
    geoCache.set(ip, { data, ts: Date.now() });
    return data;
  } catch {
    return { country: null, region: null, city: null, org: null, asn: null, isp: null, is_proxy: 0, is_hosting: 0 };
  }
}

// Traffic classification based on UA + Sec-Fetch headers + geo signals
const CRAWLER_PATTERNS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
  'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'rogerbot', 'screaming frog',
  'sitebulb', 'petalbot', 'applebot', 'ia_archiver',
];
const SCANNER_PATTERNS = [
  'nikto', 'sqlmap', 'nuclei', 'nmap', 'masscan', 'zgrab', 'gobuster', 'dirbuster',
  'wfuzz', 'hydra', 'metasploit', 'sqlninja', 'acunetix', 'nessus', 'openvas',
  'python-requests', 'go-http-client', 'libwww-perl', 'curl/', 'wget/',
  'java/', 'okhttp/', 'axios/', 'got/', 'node-fetch',
];
const HEADLESS_PATTERNS = [
  'headlesschrome', 'phantomjs', 'selenium', 'webdriver', 'puppeteer', 'playwright',
];

function classifyTraffic(ua, secFetchSite, secFetchMode, isHosting, viaCdn) {
  if (!ua) return 'suspicious';
  const uaLower = ua.toLowerCase();

  if (HEADLESS_PATTERNS.some(p => uaLower.includes(p))) return 'headless';
  if (SCANNER_PATTERNS.some(p => uaLower.includes(p))) return 'scanner';
  if (CRAWLER_PATTERNS.some(p => uaLower.includes(p))) return 'crawler';

  // Sec-Fetch headers are stripped by Cloudflare before reaching the origin.
  // Only use their absence as a suspicious signal on direct (non-CDN) connections.
  if (!viaCdn && !secFetchSite && !secFetchMode) return 'suspicious';

  // Datacenter/hosting IP with a real-looking UA — likely automated
  if (isHosting) return 'suspicious';

  return 'human';
}

// Scan path detection — common paths probed by scanners and exploit frameworks
const SCAN_PATH_PATTERNS = [
  '/wp-', '/wordpress', '/xmlrpc.php', '/wp-json/',
  '/.env', '/.git', '/.htaccess', '/.htpasswd', '/.aws',
  '/phpmyadmin', '/pma', '/mysqladmin',
  '/admin.php', '/config.php', '/shell.php', '/cmd.php', '/eval.php',
  '/etc/passwd', '/etc/shadow', '/proc/',
  '/cgi-bin/', '/manager/html', '/console',
  '/actuator', '/solr/', '/jenkins',
  '/config/database', '/database.yml',
  '/backup', '/dump.sql', '/db.sql',
  '/login.cgi', '/setup.cgi',
];

app.use((req, res, next) => {
  const lpath = req.path.toLowerCase();
  const isScanPath = SCAN_PATH_PATTERNS.some(p => lpath.includes(p));
  if (isScanPath) {
    const ip = (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || req.ip || '').trim();
    getGeoData(ip).then((geo) => {
      db.run(
        `INSERT INTO scan_attempts (path, method, user_agent, country, asn, org) VALUES (?, ?, ?, ?, ?, ?)`,
        [req.path, req.method, req.headers['user-agent'] || null, geo.country, geo.asn, geo.org]
      );
    });
    return res.status(404).end();
  }
  next();
});

// Public tracking endpoint — fire and forget from frontend
app.post('/api/track', trackingLimiter, (req, res) => {
  res.status(204).end();

  const { page, referrer, visitor_id, session_id, language, screen_width, screen_height, timezone } = req.body;
  if (!page) return;

  const ip = (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || req.ip || '').trim();
  const rawUa = req.headers['user-agent'] || '';
  const ua = new UAParser(rawUa).getResult();
  const browser = ua.browser.name || 'Unknown';
  const browser_version = ua.browser.major || null;
  const os = ua.os.name || 'Unknown';
  const device_type = ua.device.type || 'desktop';

  const secFetchSite = req.headers['sec-fetch-site'] || null;
  const secFetchMode = req.headers['sec-fetch-mode'] || null;
  const secFetchDest = req.headers['sec-fetch-dest'] || null;

  const viaCdn = !!req.headers['cf-connecting-ip'];

  getGeoData(ip).then((geo) => {
    const traffic_type = classifyTraffic(rawUa, secFetchSite, secFetchMode, geo.is_hosting, viaCdn);
    db.run(
      `INSERT INTO page_views
        (page, referrer, visitor_id, session_id, country, region, city, org,
         browser, browser_version, os, device_type, language, screen_width, screen_height,
         asn, isp, is_proxy, is_hosting, traffic_type,
         sec_fetch_site, sec_fetch_mode, sec_fetch_dest, timezone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [page, referrer || null, visitor_id || null, session_id || null,
       geo.country, geo.region, geo.city, geo.org,
       browser, browser_version, os, device_type,
       language || null, screen_width || null, screen_height || null,
       geo.asn, geo.isp, geo.is_proxy, geo.is_hosting, traffic_type,
       secFetchSite, secFetchMode, secFetchDest, timezone || null],
      (err) => { if (err) console.error('[track] INSERT error:', err.message); }
    );
  });
});

// Page leave — records time spent, capped server-side at 15 minutes
const MAX_DURATION_SECONDS = 900;

app.post('/api/track-leave', trackingLimiter, (req, res) => {
  res.status(204).end();

  const { page, visitor_id, session_id, duration_seconds } = req.body;
  if (!page || !duration_seconds) return;

  const capped = Math.min(Math.max(Math.round(Number(duration_seconds)), 0), MAX_DURATION_SECONDS);
  if (capped < 2) return;

  db.run(
    `INSERT INTO page_durations (visitor_id, session_id, page, duration_seconds) VALUES (?, ?, ?, ?)`,
    [visitor_id || null, session_id || null, page, capped],
    (err) => { if (err) console.error('[track-leave] INSERT error:', err.message); }
  );
});

// Exclusion management
app.get('/api/admin/analytics/excluded', requireAdmin, (req, res) => {
  db.all('SELECT visitor_id, label, created_at FROM excluded_visitors ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.post('/api/admin/analytics/excluded', requireAdmin, requireXRequestedWith, (req, res) => {
  const { visitor_id, label } = req.body;
  if (!visitor_id) return res.status(400).json({ error: 'visitor_id required' });
  db.run(
    'INSERT OR IGNORE INTO excluded_visitors (visitor_id, label) VALUES (?, ?)',
    [visitor_id, label || null],
    (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ ok: true });
    }
  );
});

app.delete('/api/admin/analytics/excluded/:id', requireAdmin, requireXRequestedWith, (req, res) => {
  db.run('DELETE FROM excluded_visitors WHERE visitor_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ ok: true });
  });
});

// Admin dashboard stats — top pages, top blog posts, threat type breakdown
app.get('/api/admin/dashboard/stats', requireAdmin, (req, res) => {
  const topPages = new Promise((resolve, reject) => {
    db.all(
      `SELECT page, COUNT(*) as views FROM page_views
       WHERE visitor_id NOT IN (SELECT visitor_id FROM excluded_visitors)
         AND timestamp >= datetime('now', '-30 days')
       GROUP BY page ORDER BY views DESC LIMIT 5`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const topPosts = new Promise((resolve, reject) => {
    db.all(
      `SELECT pv.page, p.title, COUNT(*) as views
       FROM page_views pv
       LEFT JOIN posts p ON p.slug = REPLACE(pv.page, '/blog/', '')
       WHERE pv.page LIKE '/blog/%'
         AND pv.visitor_id NOT IN (SELECT visitor_id FROM excluded_visitors)
         AND pv.timestamp >= datetime('now', '-30 days')
       GROUP BY pv.page ORDER BY views DESC LIMIT 5`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const threatTypes = new Promise((resolve, reject) => {
    db.all(
      `SELECT traffic_type as name, COUNT(*) as count FROM page_views
       WHERE timestamp >= datetime('now', '-30 days')
       GROUP BY traffic_type ORDER BY count DESC`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  Promise.all([topPages, topPosts, threatTypes])
    .then(([pages, posts, threats]) => res.json({ top_pages: pages, top_posts: posts, threat_types: threats }))
    .catch(() => res.status(500).json({ error: 'Database error' }));
});

// Admin analytics — pages dashboard
app.get('/api/admin/analytics/pages', requireAdmin, (req, res) => {
  const days = parseInt(req.query.days) || 30;

  const since = `datetime('now', '-${days} days')`;

  const excl = `visitor_id NOT IN (SELECT visitor_id FROM excluded_visitors)`;

  const summary = new Promise((resolve, reject) => {
    db.get(
      `SELECT COUNT(*) as total_views,
              COUNT(CASE WHEN date(timestamp) = date('now') THEN 1 END) as today_views
       FROM page_views WHERE ${excl} AND timestamp >= ${since}`,
      (err, row) => err ? reject(err) : resolve(row)
    );
  });

  const topPage = new Promise((resolve, reject) => {
    db.get(
      `SELECT page FROM page_views WHERE ${excl} AND timestamp >= ${since}
       GROUP BY page ORDER BY COUNT(*) DESC LIMIT 1`,
      (err, row) => err ? reject(err) : resolve(row?.page || null)
    );
  });

  const viewsOverTime = new Promise((resolve, reject) => {
    db.all(
      `SELECT date(timestamp) as date, COUNT(*) as views
       FROM page_views WHERE ${excl} AND timestamp >= ${since}
       GROUP BY date(timestamp) ORDER BY date`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const topPages = new Promise((resolve, reject) => {
    db.all(
      `SELECT page, COUNT(*) as views, COUNT(DISTINCT visitor_id) as unique_visitors
       FROM page_views WHERE ${excl} AND timestamp >= ${since}
       GROUP BY page ORDER BY views DESC LIMIT 20`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const referrers = new Promise((resolve, reject) => {
    db.all(
      `SELECT referrer, COUNT(*) as count
       FROM page_views WHERE referrer IS NOT NULL AND referrer != '' AND ${excl} AND timestamp >= ${since}
       GROUP BY referrer ORDER BY count DESC LIMIT 20`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  Promise.all([summary, topPage, viewsOverTime, topPages, referrers])
    .then(([s, top, chart, pages, refs]) => {
      res.json({
        summary: { total_views: s.total_views, today_views: s.today_views, top_page: top },
        views_over_time: chart,
        top_pages: pages,
        referrers: refs,
      });
    })
    .catch(() => res.status(500).json({ error: 'Database error' }));
});

// Admin analytics — visitors dashboard
app.get('/api/admin/analytics/visitors', requireAdmin, (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const since = `datetime('now', '-${days} days')`;

  const summary = new Promise((resolve, reject) => {
    db.get(
      `SELECT COUNT(DISTINCT visitor_id) as unique_visitors,
              COUNT(DISTINCT session_id) as total_sessions,
              COUNT(DISTINCT CASE WHEN date(timestamp) = date('now') THEN visitor_id END) as today_visitors
       FROM page_views WHERE timestamp >= ${since}`,
      (err, row) => err ? reject(err) : resolve(row)
    );
  });

  const visitorsOverTime = new Promise((resolve, reject) => {
    db.all(
      `SELECT date(timestamp) as date, COUNT(DISTINCT visitor_id) as unique_visitors
       FROM page_views WHERE timestamp >= ${since}
       GROUP BY date(timestamp) ORDER BY date`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const browsers = new Promise((resolve, reject) => {
    db.all(
      `SELECT browser as name, COUNT(*) as count FROM page_views
       WHERE timestamp >= ${since} GROUP BY browser ORDER BY count DESC`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const operatingSystems = new Promise((resolve, reject) => {
    db.all(
      `SELECT os as name, COUNT(*) as count FROM page_views
       WHERE timestamp >= ${since} GROUP BY os ORDER BY count DESC`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const devices = new Promise((resolve, reject) => {
    db.all(
      `SELECT device_type as name, COUNT(*) as count FROM page_views
       WHERE timestamp >= ${since} GROUP BY device_type ORDER BY count DESC`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const locations = new Promise((resolve, reject) => {
    db.all(
      `SELECT country, region, city, COUNT(*) as count FROM page_views
       WHERE country IS NOT NULL AND timestamp >= ${since}
       GROUP BY country, region, city ORDER BY count DESC LIMIT 25`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const networks = new Promise((resolve, reject) => {
    db.all(
      `SELECT asn, isp, org, COUNT(*) as count FROM page_views
       WHERE (org IS NOT NULL OR asn IS NOT NULL) AND timestamp >= ${since}
       GROUP BY COALESCE(asn, org) ORDER BY count DESC LIMIT 25`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const proxyStats = new Promise((resolve, reject) => {
    db.get(
      `SELECT
         SUM(CASE WHEN is_proxy = 1 THEN 1 ELSE 0 END) as proxy_count,
         SUM(CASE WHEN is_hosting = 1 THEN 1 ELSE 0 END) as hosting_count
       FROM page_views WHERE timestamp >= ${since}`,
      (err, row) => err ? reject(err) : resolve(row)
    );
  });

  const timezones = new Promise((resolve, reject) => {
    db.all(
      `SELECT timezone as name, COUNT(*) as count FROM page_views
       WHERE timezone IS NOT NULL AND timezone != '' AND timestamp >= ${since}
       GROUP BY timezone ORDER BY count DESC LIMIT 20`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  Promise.all([summary, visitorsOverTime, browsers, operatingSystems, devices, locations, networks, proxyStats, timezones])
    .then(([s, chart, brows, oses, devs, locs, nets, proxy, tzs]) => {
      res.json({
        summary: {
          unique_visitors: s.unique_visitors,
          total_sessions: s.total_sessions,
          today_visitors: s.today_visitors,
          proxy_count: proxy?.proxy_count ?? 0,
          hosting_count: proxy?.hosting_count ?? 0,
        },
        visitors_over_time: chart,
        browsers: brows,
        os: oses,
        devices: devs,
        locations: locs,
        networks: nets,
        timezones: tzs,
      });
    })
    .catch(() => res.status(500).json({ error: 'Database error' }));
});

// Admin analytics — visitor profiles (per-visitor drill-down)
app.get('/api/admin/analytics/visitor-profiles', requireAdmin, (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const since = `datetime('now', '-${days} days')`;

  db.all(
    `SELECT
       pv.visitor_id,
       COUNT(*)                        AS visit_count,
       COUNT(DISTINCT pv.page)         AS unique_pages,
       MIN(pv.timestamp)               AS first_seen,
       MAX(pv.timestamp)               AS last_seen,
       MAX(pv.country)                 AS country,
       MAX(pv.region)                  AS region,
       MAX(pv.city)                    AS city,
       MAX(pv.asn)                     AS asn,
       MAX(pv.isp)                     AS isp,
       MAX(pv.org)                     AS org,
       MAX(pv.browser)                 AS browser,
       MAX(pv.os)                      AS os,
       MAX(pv.device_type)             AS device_type,
       MAX(pv.timezone)                AS timezone,
       MAX(pv.traffic_type)            AS traffic_type,
       CASE WHEN ev.visitor_id IS NOT NULL THEN 1 ELSE 0 END AS is_excluded,
       ev.label                        AS exclusion_label
     FROM page_views pv
     LEFT JOIN excluded_visitors ev ON pv.visitor_id = ev.visitor_id
     WHERE pv.visitor_id IS NOT NULL
       AND pv.timestamp >= ${since}
     GROUP BY pv.visitor_id
     ORDER BY last_seen DESC
     LIMIT 200`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(rows);
    }
  );
});

app.get('/api/admin/analytics/visitor-profiles/:id', requireAdmin, (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const since = `datetime('now', '-${days} days')`;

  db.all(
    `SELECT
       pv.page,
       COUNT(*) as views,
       MAX(pv.timestamp) as last_seen,
       (SELECT ROUND(AVG(duration_seconds))
        FROM page_durations
        WHERE visitor_id = pv.visitor_id AND page = pv.page AND timestamp >= ${since}
       ) as avg_duration_seconds
     FROM page_views pv
     WHERE pv.visitor_id = ? AND pv.timestamp >= ${since}
     GROUP BY pv.page ORDER BY views DESC`,
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(rows);
    }
  );
});

// Admin analytics — threats dashboard
app.get('/api/admin/analytics/threats', requireAdmin, (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const since = `datetime('now', '-${days} days')`;

  const trafficTypes = new Promise((resolve, reject) => {
    db.all(
      `SELECT traffic_type as name, COUNT(*) as count FROM page_views
       WHERE timestamp >= ${since}
       GROUP BY traffic_type ORDER BY count DESC`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const scanSummary = new Promise((resolve, reject) => {
    db.all(
      `SELECT path, COUNT(*) as count, MAX(timestamp) as last_seen
       FROM scan_attempts
       WHERE timestamp >= ${since}
       GROUP BY path ORDER BY count DESC LIMIT 25`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const scanRecent = new Promise((resolve, reject) => {
    db.all(
      `SELECT path, method, user_agent, country, asn, org, timestamp
       FROM scan_attempts
       WHERE timestamp >= ${since}
       ORDER BY timestamp DESC LIMIT 100`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const scanOrigins = new Promise((resolve, reject) => {
    db.all(
      `SELECT asn, org, country, COUNT(*) as count
       FROM scan_attempts
       WHERE timestamp >= ${since} AND asn IS NOT NULL
       GROUP BY asn ORDER BY count DESC LIMIT 20`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  const suspiciousOrgs = new Promise((resolve, reject) => {
    db.all(
      `SELECT asn, isp, org, country, COUNT(*) as count FROM page_views
       WHERE timestamp >= ${since}
         AND (traffic_type IN ('scanner', 'headless', 'suspicious') OR is_hosting = 1 OR is_proxy = 1)
       GROUP BY asn ORDER BY count DESC LIMIT 20`,
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });

  Promise.all([trafficTypes, scanSummary, scanRecent, scanOrigins, suspiciousOrgs])
    .then(([types, scanPaths, recentScans, origins, suspicious]) => {
      res.json({
        traffic_types: types,
        scan_paths: scanPaths,
        recent_scans: recentScans,
        scan_origins: origins,
        suspicious_orgs: suspicious,
      });
    })
    .catch(() => res.status(500).json({ error: 'Database error' }));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
