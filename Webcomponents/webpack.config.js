const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');
const fileNamePrefix = isProduction? '[chunkhash].' : '';
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
    general: './src/js/index.js',
    meme: './src/js/meme.js',
  },
  output: {
      path: __dirname + "/dist",
      filename: fileNamePrefix + '[name].js',
      library: 'bundle',
      publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
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
