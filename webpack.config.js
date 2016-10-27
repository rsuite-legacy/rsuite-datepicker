const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        library: 'RsuiteDatepicker',
        libraryTarget: 'umd',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment'
    }
};
