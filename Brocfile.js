var Funnel = require('broccoli-funnel');
var concat = require('broccoli-concat');
var merge = require('broccoli-merge');

var src = new Funnel('src', {
  destDir: 'dist'
});

module.exports = concat(src, {
  outputFile: 'dist.js'
});