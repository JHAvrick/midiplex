const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const babelOptions = {
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": 3,
            "targets": "> 1%, not dead"
        }]
    ]
};

console.log(process.env.NODE_ENV);
module.exports = {
    target: 'node',
    entry: './src/midiplex.ts',
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
    output: {
        filename: 'midiplex.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'umd',
            name: 'midiplex'
        }
    },
    optimization: {
        minimize: process.env.NODE_ENV !== 'development'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            onlyCompileBundledFiles: true,
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()] //https://github.com/dividab/tsconfig-paths-webpack-plugin
    },
    plugins: [
        //new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin()
    ]
}
