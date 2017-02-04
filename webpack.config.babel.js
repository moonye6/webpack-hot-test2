const {
  resolve
} = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: ['react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/index.js'
    ]
  },
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
      // necessary for HMR to know where to load the hot update chunks
  },
  devtool: '#source-map',

  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader',
      ],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules',
        'postcss-loader',
      ],
    }, ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};