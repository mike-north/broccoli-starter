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

var loader = new Funnel(path.join(require.resolve('loader.js'), '..'), {
  include: ['loader.js']
});

/* get a new node of only *.html files in the 'src' directory */
var htmlFiles = new Funnel(projectFiles, {
  include: ['**/*.html']
});

const BABEL_OPTIONS = {
  browserPolyfill: true,
  plugins: ["transform-es2015-modules-amd", "amd-namer"],
  moduleIds: true,
  presets: [
    ['env', {
      'targets': {
        'browsers': ['last 1 versions']
      }
    }]
  ]
};

var allJs = new MergeTrees([
  loader,
  new Babel(jsFiles, BABEL_OPTIONS)]
);

var outputJs = new Concat(
  allJs, {
    outputFile: 'out.js',
    headerFiles: ['loader.js'],
    inputFiles: ['**/*'],
    header: ";(function() {",
    footer: "require('index');}());",
    sourceMapConfig: { enabled: true }
  }
);

module.exports = new MergeTrees([
  cssFiles,
  outputJs,
  htmlFiles
]);