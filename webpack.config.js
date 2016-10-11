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
    }
}
