//
// Taken from:
// https://github.com/krasimir/react-webpack-starter
//

var webpackConfig = require('../../webpack.config');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'], // Chrome / PhantomJS
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    files: [
      'specHelper.js'
    ],
    preprocessors: {
      'specHelper.js': ['webpack']
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-sinon-chai'
    ],
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  });
};