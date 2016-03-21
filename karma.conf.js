var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/*Spec.js'
    ],
    exclude: [],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    preprocessors: {
      'test/*Spec.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js?$/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015', 'stage-0']
            },
            exclude: /node_modules/
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};