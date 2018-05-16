const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    // uncomment 3 css loaders before production build and comment style-loader
                    /*{
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css'
                        }
                    },*/
                    /*{
                        loader: 'extract-loader'
                    },*/
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    /*{
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },*/
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'import-glob-loader'
                    }
                ]
            }

        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html' }
        ]),
        new LiveReloadPlugin()
    ]


};