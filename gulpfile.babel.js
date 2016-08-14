import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import sync from 'gulp-sync';
import uglify from 'gulp-uglify';
import { exec } from 'child_process';

const gulpsync = sync(gulp);

gulp.task('clean', () => del('dist'));

gulp.task('lint', () => (
  gulp.src(['src/**/*.js', 'test/**/*.js', 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('test', () => (
  gulp.src(['test/**/*.js'])
    .pipe(mocha())
));

gulp.task('precommit', gulpsync.sync(['lint', 'test']));

gulp.task('build', ['clean'], () => (
  gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(uglify())
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
