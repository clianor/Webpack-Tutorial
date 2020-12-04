const path = require("path");
const webpackConfig = require("./webpack.config");

module.exports = {
  ...webpackConfig,
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    overlay: true, // 빌드시 에러나 경고를 브라우져 화면에 표시한다.
    stats: "errors-only",
    historyApiFallback: true, // 404 발생시 index.html로 리다이렉트
  },
  mode: "development",
};
