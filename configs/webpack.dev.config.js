const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, '../client'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, '../static'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: false,
          presets: [
            ['es2015', {modules: false}], 'stage-0', 'react'
          ],
          plugins: [
            'react-hot-loader/babel',
            'transform-decorators-legacy',
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss-loader'
      },
      {
        test: /\.scss/,
        loader: 'style!css!postcss-loader!resolve-url!sass?sourceMap'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
                'url?limit=8192',
                'img'
                ]
      },
      {
        test: /\.svg$/i,
        loader: 'img',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('../client'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
    })
  ],
  devServer: {
    contentBase: '../client',
    historyApiFallback: true,
    host: config.host,
    hot: true,
    port: config.port + 1,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    },
    proxy: {
      '/api': `http://${config.host}:${config.port}`,
      '/static': `http://${config.host}:${config.port}`,
    }
  },

  target: 'web',

};
