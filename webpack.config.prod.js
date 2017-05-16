var webpack           = require( 'webpack' );
var path              = require( 'path' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

var BUILD_DIR = path.resolve( __dirname, 'public' );
var APP_DIR   = path.resolve( __dirname, 'app' );

let extractCSS = new ExtractTextPlugin( 'css/app.css' );

var config = {
    entry    : [ APP_DIR + '/App.jsx' ],
    output   : {
        path     : BUILD_DIR,
        filename : 'js/app.min.js'
    },
    module : {
        loaders : [
            {
                test    : /\.jsx?/,
                include : APP_DIR,
                loader  : 'babel'
            },
            {
                test   : /\.gif$/,
                loader : 'file-loader?name=../img/[name].[ext]'
            },
            {
                test   : /\.jpg$/,
                loader : 'file-loader?name=../img/[name].[ext]'
            },
            {
                test    : /\.scss$/i,
                include : APP_DIR,
                loader  : extractCSS.extract( [ 'css', 'sass' ] )
            }

        ]
    },
    plugins : [

        extractCSS,

        new webpack.DefinePlugin( {
            'process.env' : {
                'NODE_ENV' : JSON.stringify( 'production' )
            }
        } ),

        // Uglify options used when webpack is run with `-p` flag.
        new webpack.optimize.UglifyJsPlugin( {
            mangle   : true,
            compress : {
                warnings     : true,
                sequences    : true,
                dead_code    : true, // eslint-disable-line camelcase
                conditionals : true,
                booleans     : true,
                unused       : true,
                if_return    : true, // eslint-disable-line camelcase
                join_vars    : true, // eslint-disable-line camelcase
                drop_console : true  // eslint-disable-line camelcase
            }
        } )
    ]
};

module.exports = config;
