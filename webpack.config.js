const path = require('path');

module.exports = {
    entry: "./app/App.js",
    output: {
        filename: "public/dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
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
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve('./app')
        ]
    }
}
