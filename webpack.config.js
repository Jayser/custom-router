const Webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const WebpackValidator = require('webpack-validator');

const cfgBase = require('./configs/base');
const cfgDev = require('./configs/webpack/dev');
const cfgProd = require('./configs/webpack/prod');

const cfg = WebpackMerge({
    context: cfgBase.paths.source,
    output: {
        path: cfgBase.paths.output,        
        filename: 'js/[name].js?[hash]'
    },
    resolve: {
        root: cfgBase.paths.source,
        extensions: ['', '.js']
    },
    plugins: [
        new Webpack.NoErrorsPlugin(),
        new ForceCaseSensitivityPlugin(),
        new CleanWebpackPlugin([cfgBase.paths.output]),
        new Webpack.DefinePlugin({
            IS_DEVELOPMENT: cfgBase.isDevelop,
            IS_PROD: cfgBase.isProd
        }),
        new HtmlWebpackPlugin({
            title: cfgBase.pkg.name,
            template: 'index.html',
            favicon: 'assets/img/favicon.ico',
            hash: true
        })
    ],
    eslint: {
        configFile: 'configs/eslint/.eslintrc',
        ignoreFile: 'configs/eslint/.eslintignore'
    },
    devServer: {
        port: cfgBase.port
    }
}, cfgBase.isDevelop ? cfgDev : cfgProd);

module.exports = WebpackValidator(cfg);
