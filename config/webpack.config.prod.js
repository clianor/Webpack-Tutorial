const webpackConfig = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");

module.exports = {
  ...webpackConfig,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        parallel: true,
        extractComments: false,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            inline: false,
            annotation: true,
          },
        },
        cssProcessorPluginOptions: {
          preset: ["default", { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
  },
  mode: "production",
};
