var nodemon = require ("gulp-nodemon");
var browserSync  = require('browser-sync');
var gulp = require('gulp');

gulp.task('serve', function (cb) {
  var called = false;
  var stream = nodemon({
    script: 'src/js/server.js',
    exec: "babel-node --presets es2015,stage-2",
    ext: 'js',
    // Our watch task is already taking care of watching/reloading
    watch: [
        'src/js'
    ],
    ignore: [
        'src/js/client'
    ],
    env: { 'NODE_ENV': 'development' }
  });
  
  stream.on('restart', function () {
    setTimeout(function () {
      browserSync.reload({ stream: false });
    }, 5000);
  });
  return stream;
})