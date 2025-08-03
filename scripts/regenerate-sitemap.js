#!/usr/bin/env node

/**
 * Sitemap Generation Script
 * 
 * This script generates a sitemap.xml file based on:
 * - Static pages defined in the application
 * - Published blog posts from the database
 * 
 * Usage: node scripts/regenerate-sitemap.js
 */

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.BASE_URL || 'https://andrew.cloudhopper.ch';
const DB_PATH = path.join(__dirname, '..', 'backend', 'blog.db');
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Static pages configuration
const STATIC_PAGES = [
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

console.log('🔍 SEO Sitemap Generator');
console.log('========================');
console.log(`Database: ${DB_PATH}`);
console.log(`Output: ${SITEMAP_PATH}`);
console.log(`Base URL: ${BASE_URL}`);
console.log('');

// Initialize database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database');
});

// Generate sitemap
function generateSitemap() {
  return new Promise((resolve, reject) => {
    // Get published blog posts
    db.all(
      'SELECT slug, created_at, updated_at FROM posts WHERE published = 1 ORDER BY created_at DESC',
      (err, posts) => {
        if (err) {
          reject(err);
          return;
        }

        console.log(`📄 Found ${posts.length} published blog posts`);
        
        // Build sitemap XML
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

        // Add static pages
        console.log(`📄 Adding ${STATIC_PAGES.length} static pages`);
        STATIC_PAGES.forEach(page => {
          const lastmod = new Date().toISOString().split('T')[0];
          sitemap += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
        });

        // Add blog posts
        if (posts.length > 0) {
          console.log('📝 Adding blog posts:');
          posts.forEach(post => {
            const lastmod = new Date(post.updated_at || post.created_at).toISOString().split('T')[0];
            const url = `${BASE_URL}/blog/${post.slug}`;
            console.log(`   • ${url}`);
            
            sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
          });
        } else {
          console.log('⚠️  No published blog posts found');
        }

        sitemap += '\n</urlset>\n';
        resolve(sitemap);
      }
    );
  });
}

// Write sitemap to file
function writeSitemap(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(SITEMAP_PATH, content, 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// Main execution
async function main() {
  try {
    console.log('🔄 Generating sitemap...');
    const sitemapContent = await generateSitemap();
    
    console.log('💾 Writing sitemap to file...');
    await writeSitemap(sitemapContent);
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${SITEMAP_PATH}`);
    
    // Display file size
    const stats = fs.statSync(SITEMAP_PATH);
    console.log(`📊 File size: ${stats.size} bytes`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  } finally {
    // Close database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('🔒 Database connection closed');
      }
    });
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n⏹️  Process interrupted');
  db.close();
  process.exit(0);
});

// Run the script
main();
