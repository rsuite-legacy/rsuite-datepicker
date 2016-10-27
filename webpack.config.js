const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        library: 'RsuiteDatepicker',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: path.join(__dirname, 'dist'),
        filename: 'rsuite-datepicker.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    }
};
