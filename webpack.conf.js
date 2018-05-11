var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'www',
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
        }, ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    devtool: 'inline-source-map',
    plugins: [],
    target: 'node',
    mode: 'development'
}