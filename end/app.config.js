module.exports = {
  apps: [{
    name: 'cs-app',
    script: './dist/src/main.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'pro',
    }
  }]
};