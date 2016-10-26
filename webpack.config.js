const path = require('path');

var webpack = require('webpack');
console.log(process.env.npm_lifecycle_event);
module.exports = {
    entry: "./app/App.js",
    output: {
        path: 'public/dist/',
        publicPath: '/dist/',
        filename: "bundle.min.js",
    },
    module: {
        loaders: [
            //Bulma loader
            { test: /\.css$/, loader: "style-loader!css-loader" },
            //Font-awesome loader
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            //Jsx loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve('./app')
        ]
    }
}
