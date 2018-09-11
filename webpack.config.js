const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname)
    },
    externals: {
        kontra: 'kontra'
    },
    plugins: [new CleanWebpackPlugin(['dist'])],
    devtool: 'source-map'
};
