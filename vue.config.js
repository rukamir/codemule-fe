module.exports = {
  lintOnSave: false,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    hotOnly: false,
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/index/main.js',
      // the source template
      template: 'src/index/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Code Mule: Voucher Sending System',
    },
    console: {
      // entry for the page
      entry: 'src/console/main.js',
      // the source template
      template: 'src/console/index.html',
      // output as dist/index.html
      filename: 'console/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Sending Console',
    },
  },
};
