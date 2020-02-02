const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    index:"./src/index.js",
    building1:"./src/building/1.js",
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
      filename: "building-1.html",
      template: "./src/building/1.html",
      chunks: ["building1"]
    })
  ]
};