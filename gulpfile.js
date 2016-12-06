var gulp = require('gulp')
var babel = require('gulp-babel')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var image = require('gulp-image')

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('views', function buildHTML () {
  return gulp.src('src/views/**/*.pug')
  .pipe(pug({}))
  .pipe(gulp.dest('dist/views'))
})

gulp.task('styles', function () {
  return gulp.src('src/styles/*')
    .pipe(stylus())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('image', function () {
  gulp.src('assets/*.png')
    .pipe(image())
    .pipe(gulp.dest('img'))
})

gulp.task('watch', function () {
  gulp.start(['js', 'views', 'styles', 'image'])
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch('src/views/**/*.pug', ['views'])
  gulp.watch('src/styles/*.styl', ['styles'])
})

gulp.task('default', ['watch'])
