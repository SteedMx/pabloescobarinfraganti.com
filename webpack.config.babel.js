const {resolve} = require('path')
const webpackValidator = require('webpack-validator')
const {getIfUtils} = require('webpack-config-utils')
const webpack = require('webpack')

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  const config = webpackValidator({
    context: resolve('src'),
    entry: './app.js',
    output: {
      filename: 'bundle.js',
      path: resolve('dist'),
      publicPath: '/dist/',
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
        {test: /\.css$/, loaders: ['style', 'css']},
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      })
    ]
  })
  if (env.debug) {
    console.log(config)
    debugger
  }
  return config
}