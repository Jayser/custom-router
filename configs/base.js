const path = require('path');
const packageJSON = require('../package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

const base = {
    paths: {
        root: path.resolve(__dirname, '../'),
        source: path.resolve(__dirname, '../app'),
        output: path.resolve(__dirname, '../build'),
        reports: path.resolve(__dirname, '../reports'),
        babel: path.resolve(__dirname, '../configs/babel/.babelrc'),
        img: './img',
        fonts: './fonts'
    },
    isDevelop: NODE_ENV === 'development',
    isProd: NODE_ENV === 'production',
    port: process.env.PORT || 8080,
    pkg: packageJSON
};

module.exports = base;
