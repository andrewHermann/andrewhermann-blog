#!/bin/bash

# Start the blog application servers
echo "Starting blog application servers..."

# Kill any existing servers
echo "Stopping existing servers..."
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "serve -s build" 2>/dev/null || true

# Start backend server
echo "Starting backend server on port 3001..."
cd /var/www/andrew/andrewhermann
nohup node backend/server.js > backend.log 2>&1 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "Starting frontend server on port 5000..."
nohup npm run serve > frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

echo "Servers started successfully!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Your blog is now accessible at:"
echo "  - Local: http://localhost:5000"
echo "  - LAN: http://192.168.178.44:5000"
echo "  - Admin: http://192.168.178.44:5000/admin"
echo ""
echo "Admin credentials:"
echo "  Username: admin"
echo "  Password: vawvEr-0sigry-tatqoj"
echo ""
echo "New Features:"
echo "  - Manual date override in post editor"
echo "  - Created At and Updated At fields are now editable"
echo "  - Leave date fields empty to use current timestamp"
echo ""
echo "To stop the servers, run: pkill -f \"node.*server.js\" && pkill -f \"serve -s build\""
