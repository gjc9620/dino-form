const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.jsx',
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css|\.scss/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }]
      },
      // {
      //   test: /.scss$/,
      //   use: [{
      //     loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //     loader: "css-loader" // translates CSS into CommonJS
      //   }, {
      //     loader: "sass-loader" // compiles Sass to CSS
      //   }]
      // },
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
    }),
  ],
};
