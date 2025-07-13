# Andrew Hermann Blog

A modern React blog application with admin interface for content management.

## Features

- **Frontend**: React-based blog with responsive design
- **Admin Interface**: Full CRUD operations for blog posts
- **Authentication**: Secure admin login with session management
- **Database**: SQLite for data persistence
- **Network**: Accessible from LAN with dynamic API configuration

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Application**
   ```bash
   ./start-servers.sh
   ```

3. **Access the Blog**
   - Website: `http://***REMOVED***:5000`
   - Admin: `http://***REMOVED***:5000/admin`

## Admin Access

- **Username**: admin
- **Password**: ***REMOVED***

## Architecture

- **Frontend**: React app served on port 5000
- **Backend**: Express.js API server on port 3001
- **Database**: SQLite (`backend/blog.db`)
- **API Config**: Dynamic hostname detection for LAN access

## File Structure

```
***REMOVED***/
├── backend/
│   ├── server.js          # Express API server
│   └── blog.db           # SQLite database
├── src/
│   ├── admin/            # Admin interface components
│   ├── components/       # React components
│   ├── views/            # Page components
│   └── config/
│       └── api.js        # API configuration
├── build/                # Production build
└── start-servers.sh      # Server startup script
```

## Scripts

- `npm run build` - Build production version
- `npm run serve` - Serve production build
- `npm start` - Development server
- `./start-servers.sh` - Start both servers

## Database

The SQLite database contains:
- `admin_users` - Admin authentication
- `blog_posts` - Blog content

## Network Configuration

The application uses dynamic API configuration:
- Detects current hostname automatically
- Works with both localhost and LAN access
- No hardcoded IP addresses

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- CORS protection
- SQL injection prevention
