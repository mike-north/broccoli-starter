var path = require('path');
var Funnel = require('broccoli-funnel');
var Concat = require('broccoli-concat');
var MergeTrees = require('broccoli-merge-trees');
var Babel = require('broccoli-babel-transpiler');

// root of our source files
var projectFiles = 'src';

/* get a new node of only '*.css' files in the 'src' directory */
var cssFiles = new Funnel(projectFiles, {
  include: ['**/*.css']
});

/* get a new node of only *.js files in the 'src' directory */
var jsFiles = new Funnel(projectFiles, {
  include: ['**/*.js']
});

var loaderFile = new Funnel(path.join(require.resolve('loader.js'), '..'), {
  include: ['loader.js']
});

/* get a new node of only *.html files in the 'src' directory */
var htmlFiles = new Funnel(projectFiles, {
  include: ['**/*.html']
});

var allJs = new MergeTrees([
  loaderFile, 
  new Babel(jsFiles, {
    browserPolyfill: true,
    plugins: ["transform-es2015-modules-amd"],
    presets: [
      ['env', {
        'targets': {
          'browsers': ['last 1 versions']
        }
      }]
    ]
  })]
);

module.exports = new MergeTrees([
  cssFiles,
  new Concat(
    allJs, {
      outputFile: 'out.js',
      headerFiles: ['loader.js'],
      inputFiles: ['**/*'],
      header: ";(function() {",
      footer: "require('./index.js');}());",
      sourceMapConfig: { enabled: true }
    }
  ),
  htmlFiles
]);