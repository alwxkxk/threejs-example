const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    index:"./src/index.js",
    "1-model":"./src/fundamentals-demo/1-model/index.js",
    "points-flow":"./src/other-example/points-flow/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin([{
      from:"./static/**/*"
    }]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "1-model.html",
      template: "./src/fundamentals-demo/1-model/index.html",
      chunks: ["1-model"]
    }),
    new HtmlWebpackPlugin({
      filename: "points-flow.html",
      template: "./src/other-example/points-flow/index.html",
      chunks: ["points-flow"]
    })
  ]
};