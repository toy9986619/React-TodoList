// HtmlWeboackPlugin config
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWeboackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: [
        './src/js/index.js'
    ],

    output: {
        path: `${__dirname}/dist`,
        filename: 'app.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },

    // webpack-dev-server config
    devServer: {
        inline: true,
        port: 8888,
    },

    plugins: [HtmlWeboackPluginConfig]
};