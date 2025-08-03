#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "Warning: .env file not found. Please copy .env.example to .env and configure your settings."
    exit 1
fi

# Start the blog application servers
echo "Starting blog application servers..."

# Kill any existing servers
echo "Stopping existing servers..."
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "serve -s build" 2>/dev/null || true

# Start backend server
echo "Starting backend server on port ${BACKEND_PORT:-3001}..."
cd "${PROJECT_PATH:-$(dirname "$0")}"
nohup node backend/server.js > backend.log 2>&1 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "Starting frontend server on port ${FRONTEND_PORT:-5000}..."
nohup npm run serve > frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

echo "Servers started successfully!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Your blog is now accessible at:"
echo "  - Local: http://localhost:${FRONTEND_PORT:-5000}"
echo "  - LAN: http://${SERVER_IP:-localhost}:${FRONTEND_PORT:-5000}"
echo "  - Admin: http://${SERVER_IP:-localhost}:${FRONTEND_PORT:-5000}/admin"
echo ""
echo "Admin credentials configured via environment variables"
echo ""
echo ""
echo "To stop the servers, run: pkill -f \"node.*server.js\" && pkill -f \"serve -s build\""
