const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    entry: './index.js', // Replace './src/index.js' with your entry file path
    output: {
        path: path.resolve(__dirname, 'dist'), // Replace 'dist' with your desired output directory
        filename: 'bundle.js' // Replace 'bundle.js' with your desired output file name
    },
    // Other webpack configuration goes here
};