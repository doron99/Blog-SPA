const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    outputDir : '../../Blog-API/Blog-API/wwwroot/ClientApp',
    configureWebpack: config => {
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery',
          jQuery: 'jquery'
        })
      ],
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: { drop_console: true },
              mangle: true, // Note `mangle.properties` is `false` by default.
              module: false,
              output: { comments: false },
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: false,
            },
          }),
        ],
      }
    }
  }