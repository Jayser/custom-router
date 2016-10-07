const Webpack = require('webpack');
const cfgBase = require('../base');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:' + cfgBase.port,
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        publicPath: 'http://localhost:' + cfgBase.port + '/'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: [cfgBase.paths.source]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                include: [cfgBase.paths.source]
            }
        ],
        loaders: [
            {
                test: /\.ts(x?)$/,
                include: [cfgBase.paths.source],
                loader: "ts"
            },
            {
                test: /\.js$/,
                include: [cfgBase.paths.source],
                loaders: ['react-hot', 'babel?extends=' + cfgBase.paths.babel]
            },
            {
                test: /\.scss/,
                include: [cfgBase.paths.source],
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },
            {
                test: /\.css/,
                loaders: ['style', 'css?sourceMap']
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
    devtool: 'eval-source-map',
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
};
