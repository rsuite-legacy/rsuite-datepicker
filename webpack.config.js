const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const markdownLoader = require('markdownloader').renderer;


const extractLess = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});


const docsPath = process.env.NODE_ENV === 'development' ? './assets' : './';
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new HtmlwebpackPlugin({
    title: 'RSUITE DatePicker',
    filename: 'index.html',
    template: 'docs/index.html',
    inject: true,
    hash: true,
    path: docsPath
  }),
  extractLess
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

const common = {
  entry: path.resolve(__dirname, 'src/'),
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, ''),
    publicPath: '/'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: extractLess.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }, {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              renderer: markdownLoader.renderer
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        use: [{
          loader: 'url-loader?limit=1&hash=sha512&digest=hex&size=16&name=resources/[hash].[ext]'
        }]

      }
    ]
  }
};

module.exports = () => {

  if (process.env.NODE_ENV === 'development') {
    return Object.assign({}, common, {
      entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://127.0.0.1:3100',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'docs/index')
      ],
      devtool: 'source-map'
    });
  }


  return Object.assign({}, common, {
    entry: [
      path.resolve(__dirname, 'docs/index')
    ]
  });

};
