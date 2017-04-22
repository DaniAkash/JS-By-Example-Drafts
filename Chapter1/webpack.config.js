const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');
const extractCSS = new ExtractTextPlugin('[chunkhash].style.css');
const pathsToClean = [
  'dist'
];
const cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false,
  exclude: [],
};

module.exports = {
  context: __dirname,
  entry: "./src/js/index.js",
  output: {
      path: __dirname + "/dist",
      filename: "[chunkhash].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]'
            }
          },
          'img-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015']
          }
        }
      }
    ]
  },
  watch: true,
  plugins: [
    extractCSS,
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(__dirname + '/src/*.html'),
      minimize: isProduction,
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
};

if(isProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

/**
 * Ubuntu - https://packages.debian.org/jessie/amd64/libpng12-0/download
 */