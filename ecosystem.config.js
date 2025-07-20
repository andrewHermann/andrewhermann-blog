module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'run serve',
      cwd: '***REMOVED***',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'backend-api',
      script: 'server.js',
      cwd: '***REMOVED***/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 5001
      }
    }
  ]
};
