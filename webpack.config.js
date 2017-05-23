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
    loader: "url-loader",
    query: {
        limit: '10000',
        minetype: 'application/font-woff'
    }
};

var jsxLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
        presets: ['react', ['es2015', {'modules' : false}]]
    }
};

var loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
});

var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
});

var definePlugin = new webpack.DefinePlugin({
    jsonStubHeaders: JSON.stringify(process.env.jsonStubHeaders || ''),
    HOST: JSON.stringify(process.env.HOST || 'http://localhost:3000'),
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
});

var resolve = {
    extensions: ['*', '.js', '.jsx'],
    modules: [
        path.resolve('./app'),
        'node_modules'
    ]
};

module.exports = {
    externals: {
        'react': 'React',
        'react-router': 'ReactRouter',
        'react-dom': 'ReactDOM'
    },
    entry: "./app/App.js",
    output: {
        path: path.resolve('./public/dist/'),
        publicPath: 'dist/',
        filename: "bundle.min.js",
    },
    module: {
        rules: [
            bulmaLoader,
            fontAwesomeWoffLoader,
            fontAwesomeLoader,
            jsxLoader
        ]
    },
    plugins: [
        loaderOptionsPlugin,
        uglifyJsPlugin,
        definePlugin
    ],
    resolve: resolve
}
