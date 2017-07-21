const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

const uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    },
    output: {
        comments: false,
    },
});

module.exports = {
    entry: {
        app: ['./scripts/app.js', './styles/style.scss'],
        module1: ['./scripts/module1/module1.js', './styles/module1/module1.scss'],
        module2: ['./scripts/module2/module2.js', './styles/module2/module2.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].bundle.js'
    },
    devtool: 'source-map',
    // resolve: { alias: { vue: 'vue/dist/vue.js' } },
    plugins: [
        extractSass,
        uglify
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: { loader: 'babel-loader', options: { presets: ['env'] } }
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: extractSass.extract({
                    use: [{ loader: "css-loader", options: { minimize: true } }, { loader: "sass-loader" }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    }
}