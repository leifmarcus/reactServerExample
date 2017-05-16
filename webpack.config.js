var webpack = require('webpack');
var path = require( 'path' );
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'app');

let extractCSS = new ExtractTextPlugin('css/app.css');

var config = {
    entry: ['webpack/hot/dev-server', APP_DIR + '/App.jsx'],
    output: {
        path: BUILD_DIR,
        publicPath: "",
        filename: 'js/app.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
                test: /\.gif$/,
                loader: "file-loader?name=../img/[name].[ext]"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader?name=../img/[name].[ext]"
            },
            {
                test: /\.scss$/,
                include : APP_DIR,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.scss$/i,
                include : APP_DIR,
                loader: extractCSS.extract( ['css','sass'] )
            }
        ]
    },
    plugins: [
        extractCSS
    ]
};

module.exports = config;
