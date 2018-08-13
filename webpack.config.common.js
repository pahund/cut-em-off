const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname)
    },
    externals: {
        kontra: 'kontra'
    },
    plugins: [new CleanWebpackPlugin(['dist'])]
};
