const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    // Basic configuration
    entry: './src/index.ts',
    // Necessary in order to use source maps and debug directly TypeScript files
    devtool: 'source-map',
    module: {
        rules: [
            // Necessary in order to use TypeScript
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        // Alway keep '.js' even though you don't use it.
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
    plugins: [
        // No need to write a index.html
        new HtmlWebpackPlugin(),
        // Do not accumulate files in ./dist
        new CleanWebpackPlugin(),
        // Copy assets to serve them
        new CopyPlugin([{ from: 'assets', to: 'assets' }]),
    ],
    devServer: {
        // webpack-dev-server configuration
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        // Hot-reloading, the sole reason to use webpack here <3
        hot: true,
        writeToDisk: true,
    },
}
