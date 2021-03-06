require("json5/lib/register");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const baseWebpackConfig = require("./webpack.base.conf");
const config = require("../config"); //一些路径配置
const entry = require("../config/entry");
const utils = require("./utils");
const parser = require("postcss-safe-parser");

let prodWebpackConfig = merge(baseWebpackConfig, {
  /*设置生产环境*/
  mode: "production",
  output: {
    path: path.resolve(config.proDirectory),
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name]-[id].[chunkhash:8].js"
  },
  devtool: "#source-map",
  plugins: [
    // extract css into its own file
    new ExtractTextPlugin("css/[name].[md5:contenthash:hex:8].css"),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        // 避免 cssnano 重新计算 z-index
        // safe: parser
      },
      canPrint: true
    }),
    // 清除 dist
    new CleanWebpackPlugin([config.proDirectory], {
      root: path.resolve(__dirname, "../"),
      verbose: true,
      dry: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|pcss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!postcss-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
        loader:
          "url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=" +
          config.resourcePrefix +
          "&outputPath=" +
          config.resource +
          "/"
      },
      {
        test: /\.swf$/,
        loader: "file?name=js/[name].[ext]"
      }
    ]
  }
});

let pages = entry;
for (let chunkName in pages) {
  let conf = {
    filename: chunkName + ".html",
    template: "index.tpl.html",
    inject: true,
    title: utils.titleFun(chunkName, pages[chunkName][1]),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks: ["manifest", "vendor", "common", chunkName],
    hash: false,
    chunksSortMode: "dependency"
  };
  prodWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

let copyObj = [
  // 一些不需要走webpack的插件
  // { from: "./app/public/plugin", to: "./plugin" },
  // 固定不变的浏览器版本提示文件
  // { from: "./app/public/versionTips", to: "./versionTips" },
  // 一些固定的文件，如下载文件
  // { from: "./app/public/file", to: "./resource" },
  // 网站favicon.ico
  { from: "./app/public/img/favicon.ico", to: "./" }
];

let copyArr = [];
copyObj.map(data => {
  copyArr.push(
    new CopyWebpackPlugin([{ from: data.from, to: data.to, ignore: [".*"] }])
  );
});

/* 拷贝静态资源  */
copyArr.map(function(data) {
  return prodWebpackConfig.plugins.push(data);
});

module.exports = prodWebpackConfig;
