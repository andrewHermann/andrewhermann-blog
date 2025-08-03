// PM2 Configuration Example
// Copy this file to ecosystem.config.js and update with your values

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'run serve',
      cwd: '/path/to/your/project',  // Update this path
      env: {
        NODE_ENV: 'production',
        PORT: 5000  // Adjust port as needed
      }
    },
    {
      name: 'backend-api',
      script: 'server.js',
      cwd: '/path/to/your/project/backend',  // Update this path
      env: {
        NODE_ENV: 'production',
        PORT: 5001  // Adjust port as needed
      }
    }
  ]
};
