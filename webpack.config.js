'use strict'

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/js/index.js',

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'src/_includes/assets')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new WebpackAssetsManifest(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css'
    })
  ],

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src/js')],
        loader: 'babel-loader',

        options: {
          plugins: ['syntax-dynamic-import'],

          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/assets/'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/fonts/'
        }
      }
    ]
  },

  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minSize: 30000
    }
  }
}
