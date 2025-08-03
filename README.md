# Andrew Hermann Blog

A modern React blog application with admin interface for content management.

## Features

- **Frontend**: React-based blog with responsive design
- **Admin Interface**: Full CRUD operations for blog posts
- **Authentication**: Secure admin login with session management
- **Database**: SQLite for data persistence
- **Network**: Accessible from LAN with dynamic API configuration

## Quick Start

## Environment Setup

**IMPORTANT**: Before running the application, you must configure your environment:

1. **Copy Environment Template**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file with your settings**:
   - Set `ADMIN_PASSWORD` to a secure password
   - Configure `SERVER_IP` for your network
   - Generate a secure `SESSION_SECRET`

3. **Generate Session Secret** (optional):
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"  
   ```

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Application**
   ```bash
   ./start-servers.sh
   ```

3. **Access the Blog**

## Admin Access

- **Admin Panel**: `http://YOUR_SERVER_IP:5000/admin`
- **Credentials**: Set via environment variables (`ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`)
- **Default Username**: `admin` (configurable in `.env`)
   - Website: `http://YOUR_SERVER_IP:5000`
   - Admin: `http://YOUR_SERVER_IP:5000/admin`


## Architecture

- **Frontend**: React app served on port 5000
- **Backend**: Express.js API server on port 5001
- **Database**: SQLite (`backend/blog.db`)
- **API Config**: Dynamic hostname detection for LAN access

## File Structure

```
/path/to/your/project/
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

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ You can use, modify, and distribute this software
- ✅ You can use it for commercial purposes
- ✅ You can distribute modified versions
- ⚠️ **Any derivative work must also be licensed under GPL v3+**
- ⚠️ You must include the original license and copyright notice
- ⚠️ You must document any changes you make

For more information about GPL v3, visit: https://www.gnu.org/licenses/gpl-3.0.html

## Copyright

Copyright (C) 2024 Andrew Hermann

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
