# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.0.0] - 2025-01-19

### Added
- Admin panel with role-based access control (admin / blogger / reader)
- Blog post management with Markdown editor and live preview
- User management for admin role
- Dynamic sitemap generation
- SEO structured data and Open Graph metadata
- Cookie consent banner (GDPR)
- Markets page with live cryptocurrency and precious metals data
- Floating 3D robot mascot
- Open Source badge and GPL v3 licensing

### Changed
- Complete visual redesign — Swiss Modernism 2.0 design system
- Migrated all components to shared CSS design tokens
- Left-aligned typography throughout

### Fixed
- Blog post content now renders Markdown correctly
- Navbar vertical alignment
- Policy pages use consistent section card styling

### Security
- Rate limiting on login and admin endpoints
- Session cookie hardened (`httpOnly`, `sameSite: strict`, production `secure`)
- Removed hardcoded IP from CORS configuration
- Input validation added to user creation endpoint
- Removed unused packages (`dangerous-html`, `multer`, `next`)

## [1.0.0] - 2024-12-01

### Added
- Initial public release
- Portfolio, About, Blog, Contact, Markets pages
- Express.js backend with SQLite
- GitHub Actions CI pipeline
