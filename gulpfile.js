var gulp = require('gulp');
var webpack = require('gulp-webpack');
var del = require('del');

gulp.task('clean', function(done) {
  del(['compiled'], done);
});

gulp.task('webpack', function() {
  return gulp.src('src/index.js')
    .pipe(webpack({
      context: __dirname + '/src',
      entry: './index',
      output: {
        path: __dirname + '/compiled',
        filename: 'index.js'
      }
    }))
    .pipe(gulp.dest('compiled/'));
});

gulp.task('copy', ['clean'], function() {
  return gulp.src([
    'src/index.html',
    'src/index.css'
  ]).pipe(gulp.dest('compiled/'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', 'webpack');
  gulp.watch(['src/index.html', 'src/index.css'], 'copy');
});

gulp.task('default', ['clean', 'webpack', 'copy']);
