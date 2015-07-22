'use strict';

var webpack = require('webpack');
var path = require('path');


var sassPaths = [
  'client/stylesheets/',
]
.map(function(m){ return path.resolve(__dirname, m); })
.join('&includePaths[]=');

module.exports = {
  context: __dirname + '/client',
  entry: {
    main: "./index.js",
    vendors: ['react', 'react-router', 'nuclear-js', 'jquery', 'classnames', 'react-mixin', 'axios']
  },

  output: {
    path: "./build",
    filename: "[name].js"
  },

  resolve: {
    modulesDirectories: [ 'node_modules' ],
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendors'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: "style!css!sass?includePaths[]=" + sassPaths},
      { test: /\.jsx$|\.js$/, loader: 'babel'},
      { test: /\.woff$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  }
}
