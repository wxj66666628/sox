var gulp = require('gulp'),
  sass = require('gulp-sass'),
  swig = require('gulp-swig'),
  serve = require('gulp-serve')

gulp.task('serve', serve({
  port: '3003',
  root: ['.']
}))

gulp.task('css', function() {
  gulp.src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'))
})

gulp.task('html', function() {
  var time = new Date().getTime()
  gulp.src('./src/html/index.html')
    .pipe(swig({
      defaults: {
        cache: false,
        locals: {
          time: time
        }
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', ['css'])
  gulp.watch('./src/html/*.html', ['html'])
})

gulp.task('build', ['css', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])
