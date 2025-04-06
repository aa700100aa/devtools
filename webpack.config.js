// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require("webpack");
var path = require("path");
var glob = require("glob");

// // filenameを取得するメソッドを追記
// // 後ほど使用
// String.prototype.filename = function(){
//   return this.match(".+/(.+?)([\?#;].*)?$")[1];
// }

// // ./js/配下のindex.jsのファイルをpathも含めて取得する
// var targets = glob.sync(`./js/*.js`);

// // entryに入れるhash
// var entries = {};

// // pathも含めたfilenameからpathとfilenameでhashを作る
// targets.forEach(value => {
//   var re = new RegExp(`./js/`);
//   var key = value.replace(re, '');

//   entries[key] = value;
// });

// module.exports = {
//   // モード値を production に設定すると最適化された状態で、
//   // development に設定するとソースマップ有効でJSファイルが出力される
//   mode: "production",
//   // 入力ファイル エントリーポイント
//   entry: entries, //作成したhashをset
//   // 出力ファイル
//   output: {
//     filename: "[name]"
//   },

//   module: {
//     rules: [
//       {
//         // 拡張子 .js の場合
//         test: /\.js$/,
//         use: [
//           {
//             // Babel を利用する
//             loader: 'babel-loader',
//             // Babel のオプションを指定する
//             options: {
//               presets: [
//                 // プリセットを指定することで、ES2020 を ES5 に変換
//                 '@babel/preset-env',
//               ]
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new webpack.ProvidePlugin({
//       $: 'jquery',
//       jQuery: 'jquery'
//     })
//   ]
// };

//const baseDir = '../kids/rk3rh3ia74/wp-content/themes/kids/';
const baseDir = "../portfolio/";

const config = {
  js: {
    src: `${baseDir}assets/org/js/entry/`,
  },
};

// filenameを取得するメソッドを追記
// 後ほど使用
String.prototype.filename = function () {
  return this.match(".+/(.+?)([?#;].*)?$")[1];
};

// ./js/配下のindex.jsのファイルをpathも含めて取得する
var targets = glob.sync(`${config.js.src}**/*.js`);

// entryに入れるhash
var entries = {};

// pathも含めたfilenameからpathとfilenameでhashを作る
targets.forEach((value) => {
  var re = new RegExp(`${config.js.src}`);
  var key = value.replace(re, "./js/");

  entries[key] = value;
});

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効（未圧縮）でJSファイルが出力される
  mode: "production",
  // 入力ファイル エントリーポイント
  entry: entries, //作成したhashをset
  // 出力ファイル
  output: {
    filename: "[name]",
  },

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
};
