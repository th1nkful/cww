const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction || 'development',
  entry: path.join(__dirname, './src/index.js'),
  target: 'web',
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
    }),
  ],
  devServer: isProduction ? undefined : {
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  node: false,
  resolve: {
    fallback: {
      fs: false,
    },
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    runtimeChunk: 'single',
  },
  output: {
    path: path.join(__dirname, '../server/dist/webapp/'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      // Javascript
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          sourceType: 'unambiguous',
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|ttf|woff|woff2|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
