const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');
const fileNamePrefix = isProduction? '[chunkhash].' : '';
const extractCSS = new ExtractTextPlugin({
  filename: fileNamePrefix + 'style.css',
  disable: !isProduction,
});
const extractLess = new ExtractTextPlugin({
    filename: fileNamePrefix + "[name].css",
    disable: !isProduction,
});
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
  entry: {
    general: './src/js/general.js',
    home: './src/js/home.js',
  },
  output: {
      path: __dirname + "/dist",
      filename: fileNamePrefix + '[name].js',
      library: 'bundle',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: "css-loader",
        })
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ],
          fallback: "style-loader",
        })
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
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
  watch: !isProduction,
  plugins: [
    extractCSS,
    extractLess,
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(__dirname + '/*.html'),
      minimize: isProduction,
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
  devtool: !isProduction?'source-map':'',
};

if(isProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    function() {
      this.plugin("done", function(status) {
        require("fs").writeFileSync(
          __dirname + "/dist/config.json",
          JSON.stringify(status.toJson().assetsByChunkName));
      });
    }
  );
}

/**
 * Ubuntu - https://packages.debian.org/jessie/amd64/libpng12-0/download
 */
