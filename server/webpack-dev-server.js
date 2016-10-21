const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../configs/webpack.dev.config');
const config = require('../configs');

const port = config.port + 1;

const options = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false
  },
  proxy: {
    '/api': `http://${config.host}:${config.port}`,
  }
};

const compiler = webpack(webpackConfig);
const webpackDevServer = new WebpackDevServer(compiler, options);
    
webpackDevServer.listen(port, config.host, () => {
  console.log(`Webpack dev server started: http://${config.host}:${port}/`);
});