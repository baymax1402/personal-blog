const path = require("path");
const webpack = require("webpack"); //引入webpack
const opn = require("opn"); //打开浏览器
const merge = require("webpack-merge"); //webpack配置文件合并
const fo = require("eslint-friendly-formatter");
// https://www.npmjs.com/package/stylelint-webpack-plugin
const StyleLintPlugin = require("stylelint-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const baseWebpackConfig = require("./webpack.base.conf"); //基础配置
const config = require("../config"); //一些路径配置

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

let devWebpackConfig = merge(baseWebpackConfig, {
  /*设置开发环境*/
  mode: "development",
  output: {
    path: path.resolve(config.devDirectory),
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
    publicPath: ""
  },
  devtool: "#eval-source-map",
  plugins: [
    // 设置热更新
    new webpack.HotModuleReplacementPlugin(),
    // stylelint
    new StyleLintPlugin({
      context: "app",
      files: ['**/*.(sa|sc|pc|le)ss'],
      failOnError: false,
      quiet: true,
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader", "cache-loader"],
        include: [resolve("app"), resolve("entryBuild")],
        exclude: [resolve("node_modules")]
      },
      {
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [resolve("app")],
        options: {
          formatter: fo,
          emitWarning: true
        }
      },
      {
        test: /\.(css|pcss)$/,
        loader: "style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap",
        exclude: /node_modules/
      }
    ]
  },
  // 设置api转发
  devServer: {
    host: config.host,
    port: config.port,
    hot: true,
    inline: true,
    contentBase: path.resolve(config.devDirectory),
    historyApiFallback: true,
    after() {
      opn(`http://localhost:${this.port}`);
    }
  }
});
module.exports = devWebpackConfig;
