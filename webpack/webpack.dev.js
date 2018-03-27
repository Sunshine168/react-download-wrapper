const path = require('path')
const webpack = require('webpack')

const HotMiddleWareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'

module.exports = {
  entry: [HotMiddleWareConfig, path.resolve(__dirname, '../public/app.js')],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    publicPath: '/',
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, '../build'),
    publicPath: '/',
    historyApiFallback: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
