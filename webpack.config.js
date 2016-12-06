const path = require('path');

var webpack = require('webpack');

var bulmaLoader = {
    test: /\.css$/,
    loader: "style-loader!css-loader"
};

var fontAwesomeLoader = {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
};

var fontAwesomeWoffLoader = {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000&minetype=application/font-woff"
};

var jsxLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
        presets: ['react', 'es2015']
    }
};

var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
});

var definePlugin = new webpack.DefinePlugin({
    HOST: JSON.stringify(process.env.HOST || 'http://localhost:3000'),
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
});

var resolve = {
    extensions: ['', '.js', '.jsx'],
    root: [
        path.resolve('./app')
    ]
};

module.exports = {
    entry: "./app/App.js",
    output: {
        path: 'public/dist/',
        publicPath: '/dist/',
        filename: "bundle.min.js",
    },
    module: {
        loaders: [
            bulmaLoader,
            fontAwesomeWoffLoader,
            fontAwesomeLoader,
            jsxLoader
        ]
    },
    plugins: [
        uglifyJsPlugin,
        definePlugin
    ],
    resolve: resolve
}
