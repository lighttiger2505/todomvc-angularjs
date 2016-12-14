'use strict';

//モジュールロード
var gulp = require('gulp');
var browser = require("browser-sync");

var typescript = require("gulp-typescript");
var browserify = require("browserify");
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var plumber = require('gulp-plumber');

var bower = require('bower');
var del = require('del');

var HandleError = require('./gulp/util/handleErrors.js');

//TypeScriptプロジェクト定義
var typescriptProject = typescript.createProject("tsconfig.json");

//クリーン
gulp.task('clean',del.bind(null, ['dest/**', '!dest/bower_components']));

gulp.task('bower', function() {
  return bower.commands.install();
});

// browserifyによるminify
gulp.task('browserify', function() {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/app.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle(plumber)
  // .on('error', function(err){
  //   console.log(err.message);
  //   console.log(err.stack);
  //  })
  .on('error', HandleError)
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  // .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest("dest"))
  .pipe(browser.reload({stream:true}));
});

// ブラウザ同期
gulp.task('browser-sync', function() {
    return browser.init(null, {
        server: './dest',
    });
});

// htmlコピー
gulp.task('html', function() {
  return gulp.src("src/**/*.html")
  .pipe(gulp.dest("dest"))
  .pipe(browser.reload({stream:true}));
});

// cssコピー
gulp.task('css', function() {
  return gulp.src("src/**/*.css")
  .pipe(gulp.dest("dest"))
  .pipe(browser.reload({stream:true}));
});

//デフォルト
gulp.task('default', ['browserify','html','css','bower','browser-sync'], function () {
  gulp.watch("./src/**/*.ts", ['browserify']);
  gulp.watch("./src/**/*.html", ['html']);
  gulp.watch("./src/**/*.css", ['css']);
});
