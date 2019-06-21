require('dotenv/config');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const nodeExternals = require('webpack-node-externals');

const DEBUG = process.env.DEBUG !== '0';

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'dev' : 'production'),
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.ejs'),
    filename: path.join(__dirname, 'dist', 'views', 'index.hbs'),
  }),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
  }),
];

if (!DEBUG) {
  plugins.push(new webpack.HashedModuleIdsPlugin());
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DuplicatePackageCheckerPlugin(),
  );
}

module.exports = [
  {
    name: 'client',
    context: __dirname,
    entry: [
      ...(DEBUG ? ['webpack-hot-middleware/client?reload=true'] : []),
      './src/client',
    ],
    output: {
      filename: `js/[name].${DEBUG ? '' : '[contenthash].'}js`,
      path: path.join(__dirname, 'dist'),
      publicPath: '/static/',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions', 'ie >= 11'],
                  },
                  useBuiltIns: 'entry',
                  corejs: 2,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-do-expressions',
            ],
          },
        },
        {
          test: /\.scss$/,
          use: [
            DEBUG ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.css$/,
          use: [
            DEBUG ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
          ],
        },
        {
          test: /\.(ttf|eot|otf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          options: {
            name: `fonts/[name].${DEBUG ? '' : '[hash].'}[ext]`,
          },
        },
        {
          test: /\.(png|jpg|jpeg)?$/,
          loader: 'file-loader',
          options: {
            name: `images/[name].${DEBUG ? '' : '[hash].'}[ext]`,
          },
        },
      ],
    },
    devtool: DEBUG ? 'eval-source-map' : 'nosources-source-map',
    optimization: DEBUG
      ? {}
      : {
          splitChunks: {
            chunks: 'all',
          },
          runtimeChunk: true,
        },
    mode: DEBUG ? 'development' : 'production',
    plugins,
  },
  {
    name: 'server',
    context: __dirname,
    target: 'node',
    entry: './src/app-middleware',
    output: {
      filename: 'server.js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/static/',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
          },
        },
      ],
    },
    externals: [nodeExternals()],
    devtool: DEBUG ? 'eval' : 'source-map',
    mode: DEBUG ? 'development' : 'production',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'dev' : 'production'),
      }),
    ],
  },
];
