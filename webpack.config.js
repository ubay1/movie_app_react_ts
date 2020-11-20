const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        app: path.join(__dirname, 'index.tsx')
    },
    output: {
        path: path.join(__dirname, '/bundle'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 8001
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
               test: /\.(sass|scss)$/,
               use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
               ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ],
    },
    // target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new FaviconsWebpackPlugin('./src/assets/img/favicon-32x32.png')
    ]
}