// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

gulp.task('imagemin', function() {
  var imgSrc = './images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// include plug-ins
var minifyHTML = require('gulp-minify-html');

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = '*.html',
      htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});


// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src('./js/*.js')
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});




gulp.task('default', ['imagemin', 'htmlpage', 'scripts'], function() {
  // watch for HTML changes
  gulp.watch('*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch('./js/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./css/*.css', function() {
    gulp.run('styles');
  });
});