const path = require('path');

module.exports = {
    entry: './demo/app.js',
    output: {
        path: path.resolve(__dirname, './demo/bundle.js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.less$/, loader: 'style!css!less' }
        ]
    },
    devtool: 'source-map'
};
