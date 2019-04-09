// HtmlWeboackPlugin config
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWeboackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: [
        './src/index.js'
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],

                            plugins: [
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
                    }
                ],
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