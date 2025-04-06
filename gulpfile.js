// gulpプラグインの読み込み
const gulp = require("gulp");

// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var sassGlob = require("gulp-sass-glob");
var cleanCSS = require("gulp-clean-css");

// webpackの設定ファイルの読み込み
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

//ejs
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");

//エラー
const notify = require("gulp-notify");

//const baseDir = '../kids/rk3rh3ia74/wp-content/themes/kids/';
const baseDir = "../portfolio/";

const config = {
  sass: {
    src: `${baseDir}assets/org/sass/`,
    dist: `${baseDir}assets/css/`,
  },
  js: {
    src: `${baseDir}assets/org/js/`,
    dist: `${baseDir}assets/`,
  },
  html: {
    src: `${baseDir}templates/`,
    dist: `${baseDir}`,
  },
};

// style.scssをタスクを作成する
gulp.task("sass", function () {
  return gulp
    .src([`${config.sass.src}*.scss`, "!./sass/common/"]) // コンパイル対象のSassファイル
    .pipe(sassGlob())
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(sass())
    .pipe(
      autoprefixer({
        grid: true,
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${config.sass.dist}`));
});
gulp.task("css", function (done) {
  gulp.watch(`${config.sass.src}**/*.scss`, gulp.series("sass"));
  done();
});

// js
gulp.task("bundle", function () {
  return plumber(notify.onError("Error: <%= error.message %>"))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(`${config.js.dist}`));
});
gulp.task("js", function (done) {
  gulp.watch(`${config.js.src}**/*.js`, gulp.series("bundle"));
  done();
});

//ejs
gulp.task("ejs", function () {
  return gulp
    .src([`${config.html.src}**/*.ejs`, `!${config.html.src}**/_*.ejs`])
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(ejs({}, {}, { ext: ".html" }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest(`${config.html.dist}`));
});
gulp.task("html", function (done) {
  gulp.watch(`${config.html.src}**/*.ejs`, gulp.series("ejs"));
  done();
});

//ブラウザシンク
gulp.task("browserSync", function (done) {
  browserSync.init({
    server: {
      baseDir: `${baseDir}`, // ルートとなるディレクトリを指定
    },
    port: 3000,
  });
  gulp.watch([`${baseDir}`, `${baseDir}index.html`], function (done) {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
    done();
  });
  done();
});

//gulp.task("default", gulp.series(gulp.parallel("js", "css")));
gulp.task(
  "default",
  gulp.series(gulp.parallel("js", "css", "html", "browserSync"))
);
