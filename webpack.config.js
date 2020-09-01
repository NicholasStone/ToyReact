const resolve = require('path').resolve

module.exports = {
  entry: {
    main: resolve(__dirname, 'src/main.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', {
              // 用于指定处理函数 默认为 React.createElement, 这里指定为 createElement
              pragma: 'createElement'
            }]]
          }
        }
      }
    ]
  },
  mode: 'development',
  optimization: {
    minimize: false
  },
  devtool: 'eval-cheap-moduelsource-map',
}