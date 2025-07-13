module.exports = {
  apps: [{
    name: 'andrewhermann',
    script: 'npm',
    args: 'run serve',
    cwd: '/var/www/andrew/andrewhermann',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M'
  }]
}
