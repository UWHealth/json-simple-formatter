import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import { exec } from 'child_process';

gulp.task('clean', () => del('dist'));

gulp.task('lint', () => (
  gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('build', ['clean'], () => (
  gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'))
));

gulp.task('npm:install', ['build'], (cb) => (
  exec('npm i -g', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(null);
  })
));

gulp.task('watch', ['npm:install'], () => (
  gulp.watch('src/**/*.js', ['npm:install'])
));
