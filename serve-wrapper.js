import('serve').then(serve => {
  serve.default({ directory: 'build', port: 5000, single: true });
});
