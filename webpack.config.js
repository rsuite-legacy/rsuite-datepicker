const path = require('path');

module.exports = {
    entry: './demo/app.js',
    output: {
        path: path.resolve(__dirname, './demo'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.less$/, loader: 'style!css!less' }
        ]
    },
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment'
    }
};
