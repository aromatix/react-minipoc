const conf = require('./gulp.conf');

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: true,
    autoWatch: false,
    logLevel: 'INFO',
    junitReporter: {
      outputDir: 'test-reports'
    },
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'jasmine'
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      conf.path.src('index.spec.js')
    ],
    preprocessors: {
      [conf.path.src('index.spec.js')]: [
        'webpack'
      ]
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      // specify a common output directory
      dir: 'coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    },
    webpack: require('./webpack-test.conf'),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
      require('karma-webpack')
    ]
  };

  config.set(configuration);
};
