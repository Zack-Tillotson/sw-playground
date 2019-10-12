const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const isProdBuild = process.argv.indexOf('-p') !== -1;

const templatePlugin = new HtmlWebpackPlugin({
  template      : './static/pageTemplate.html',
  hash          : false,
  filename      : 'pageTemplate.html',
  inject        : 'body',
  minify   : {
    collapseWhitespace : true
  },
  inlineSource: '.css$',
});

const inlinePlugin = new HtmlWebpackInlineSourcePlugin();

const config = {
  entry: {
    'assets/app': './src/entryWeb.js',
  },
  mode: isProdBuild ? 'production' : 'development',
  resolve: {
    modules: ['node_modules', './src', './static'],
    extensions: ['.js', '.jsx', '.scss', '.json']
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, '../app'),
    publicPath: isProdBuild ? '/' : 'http://localhost:8888/' // Required for webpack-serve
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          cssLoader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    envPlugin,
    templatePlugin,
    inlinePlugin,
  ],
};

if(!isProdBuild) {
  config.devtool = 'inline-source-map';
  config.devServer = {
    port: '8888',
    index: 'pageTemplate.html',
    contentBase: 'static',
    proxy: {
      '**/': {
        target: 'http://localhost:8888',
        pathRewrite: {'.*': 'pageTemplate.html'},
      }
    },
  }
}

module.exports = config;
