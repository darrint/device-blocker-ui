module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
      filename: "bundle.js"
    },
    module: {
      loaders: [
        //{ test: /\.css$/, loader: "style!css" },
        { test: /\.js$/, loader: "babel-loader" },
      ]
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8000/',
          secure: false
        }
      }
    },
};
