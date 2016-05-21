const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const { mapValues } = require('lodash');

module.exports = Object.assign({}, baseConfig, {
  entry: mapValues(baseConfig.entry, entry => ([
    ...entry,
  ])),
  output: Object.assign({}, baseConfig.output, {
    path: path.join(__dirname, 'dist', 'assets'),
  }),
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
});
