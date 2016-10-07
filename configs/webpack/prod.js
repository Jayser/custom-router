const Webpack = require('webpack');
const cfgBase = require('../base');

module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        publicPath: './'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: [cfgBase.paths.source]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                include: [cfgBase.paths.source],
                loaders: ['react-hot', 'babel?extends=' + cfgBase.paths.babel]
            },
            {
                test: /\.scss/,
                include: [cfgBase.paths.source],
                loaders: ['style', 'css?minimize&sourceMap', 'sass?sourceMap']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=' + cfgBase.paths.fonts + '/[name].[ext]?[hash]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url?&limit=10000&name=' + cfgBase.paths.img + '/[name].[ext]?[hash]'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=' + cfgBase.paths.fonts + '/[name].[ext]?[hash]'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
