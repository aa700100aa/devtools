# プロジェクト名

## 必要なコマンド

このプロジェクトでは、以下のコマンドを使用してGulpタスクを実行します。

### Gulpの実行方法

Gulpを実行するには、次のコマンドを使用します：

```bash
npx gulp
```

## gulpfile.jsの変更箇所

必要に応じて以下のgulpfile.js内の以下の箇所を書き換えてgulpを実行してください。

```bash
# 25行目
const baseDir = "../portfolio/";

# 102行目〜106行目
//gulp.task("default", gulp.series(gulp.parallel("js", "css")));
gulp.task(
  "default",
  gulp.series(gulp.parallel("js", "css", "html", "browserSync"))
);
```