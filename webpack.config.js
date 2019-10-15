const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProdBuild = process.argv.indexOf('-p') !== -1;

const envPlugin = new webpack.DefinePlugin({
  __DEBUG__: JSON.stringify(!isProdBuild),
  __RELEASE__: JSON.stringify(isProdBuild),
  'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"'
});

const basePluginConfig = {
  template      : './src/pageTemplate.html',
  hash          : false,
  inject        : 'body',
  minify   : {
    collapseWhitespace : true
  },
  inlineSource: '.css$',
};

const templatePlugin = [
  new HtmlWebpackPlugin({
    ...basePluginConfig,
    chunks: ['aftStyles', 'home'],
    filename: 'index.html',
  }),
  new HtmlWebpackPlugin({
    ...basePluginConfig,
    chunks: ['aftStyles', 'introduction'],
    filename: 'introduction/index.html',
  }),
  new HtmlWebpackPlugin({
    ...basePluginConfig,
    chunks: ['aftStyles', 'networking'],
    filename: 'networking/index.html',
  }),
  new HtmlWebpackPlugin({
    ...basePluginConfig,
    chunks: ['aftStyles', 'lifecycle'],
    filename: 'sw-lifecycle/index.html',
  }),
  new HtmlWebpackPlugin({
    ...basePluginConfig,
    chunks: ['aftStyles', 'precaching'],
    filename: 'precaching/index.html',
  }),
  new HtmlWebpackPlugin({
    ...basePluginConfig,
    chunks: ['aftStyles', 'pushNotifications'],
    filename: 'push-notifications/index.html',
  }),
];

const inlinePlugin = new HtmlWebpackInlineSourcePlugin();

let cssLoader = isProdBuild ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: {
    aftStyles: './src/aftStylesEntry',
    home: './src/homeEntry',
    introduction: './src/introductionEntry',
    networking: './src/networkingEntry',
    lifecycle: './src/lifecycleEntry',
    precaching: './src/precachingEntry',
    pushNotifications: './src/pushNotificationEntry',
  },
  mode: isProdBuild ? 'production' : 'development',
  resolve: {
    modules: ['node_modules', './src', './static'],
    extensions: ['.js', '.jsx', '.scss', '.json']
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, './public'),
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
          { loader: cssLoader },
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
    ...templatePlugin,
    inlinePlugin,
  ],
};

if(!isProdBuild) {
  config.devtool = 'inline-source-map';
  config.devServer = {
    port: '8888',
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
