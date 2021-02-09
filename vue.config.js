const path = require('path')
const webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin');


function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
const vueConfig = {
    configureWebpack: {
        devtool:'eval-source-map',
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.IgnorePlugin(/moment\//),
            new uglify()
        ],
        resolve:{
            alias:{
                '@': path.resolve(__dirname, './src')
            }
        }
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.68.140:8000',
                pathRewrite: { '^/api': '' },
                ws: false,
                changeOrigin: true
            },
        }
    },

}

module.exports = vueConfig
