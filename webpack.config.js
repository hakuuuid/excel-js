const path = require('path')
// webpack plugins
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const filename = (ext) => isDevelopment ?
  `bundle.${ext}` :
  `bundle.[hash].${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ]

  if (isDevelopment) {
    loaders.push('eslint-loader')
  }

  return loaders;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  devtool: isDevelopment ? 'source-map' : false,
  devServer: {
    hot: isDevelopment,
    port: 3000,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'core': path.resolve(__dirname, 'src/core'),
    },
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: isProduction,
        removeComments: isProduction,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
      {
        from: path.resolve(__dirname, 'src/table-icon.png'),
        to: path.resolve(__dirname, 'dist'),
      }],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDevelopment,
            reloadAll: true,
          },
        },
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: jsLoaders(),
    },
    ],
  },
}
