const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config.json');

const webpackConfig = {
    entry: [
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /styles/],
                loaders: ['babel-loader']
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new BrowserSyncPlugin({
                proxy: config.proxyURL,
                files: [
                    '**/*.php'
                ],
                reloadDelay: 0,
            }
        )
    ]
};

if (process.env.NODE_ENV === 'production') {
    const buildFolder = path.resolve(__dirname, 'pro-photo-built');
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        "mangle": {
            "screw_ie8": true
        },
        "compress": {
            "screw_ie8": true,
            "warnings": false
        },
        "sourceMap": false
    }));

    webpackConfig.plugins.push(
        new CleanWebpackPlugin([buildFolder])
    );

    webpackConfig.plugins.push(
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, 'server') + '/**', to: buildFolder},
            {from: path.resolve(__dirname, '*.php'), to: buildFolder},
        ], {

            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
        })
    );

    webpackConfig.output.path = buildFolder + '/dist';
}

module.exports = webpackConfig;