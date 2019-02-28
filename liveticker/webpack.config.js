const path = require('path');  // node.js uses CommonJS modules
var webpack = require('webpack');


module.exports = {
  entry: './clientsrc/client.js',  // the entry point
  plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "window.jQuery": "jquery"
        })
    ],
  resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
  output: {
    filename: 'bundle.js',  // the output filename
    path: path.resolve(__dirname, 'public')  // fully qualified path
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
