module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'run serve',
      cwd: '/var/www/andrew/andrewhermann',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'backend-api',
      script: 'server.js',
      cwd: '/var/www/andrew/andrewhermann/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 5001
      }
    }
  ]
};
