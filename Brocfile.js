var Funnel = require('broccoli-funnel');
var Concat = require('broccoli-concat');
var MergeTrees = require('broccoli-merge-trees');

// root of our source files
var projectFiles = 'src';

/* get a new node of only files in the 'src/css' directory
  cssFiles contains the following files:

  ├── reset.css
  └── todos.css
*/
var cssFiles = new Funnel(projectFiles, {
  include: ['**/*.css']
});

/* get a new node of only files in the 'src/css' directory
  cssFiles contains the following files:

  ├── reset.css
  └── todos.css
*/
var jsFiles = new Funnel(projectFiles, {
  include: ['**/*.js']
});

/* get a new node of only files in the 'src/css' directory
  cssFiles contains the following files:

  ├── reset.css
  └── todos.css
*/
var htmlFiles = new Funnel(projectFiles, {
  include: ['**/*.html']
});



module.exports = new MergeTrees([
  cssFiles,
  new Concat(jsFiles, { outputFile: 'out.js' }),
  htmlFiles
]);