// NOTE: paths are relative to each functions folder

const Webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: './lib',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'source-map',
  externals: {
    // // aws-sdk does not (currently) build correctly with webpack. However,
    // // Lambda includes it in its environment, so omit it from the bundle.
    // // See: https://github.com/apex/apex/issues/217#issuecomment-194247472
    // 'aws-sdk': 'aws-sdk',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          cacheDirectory: false,
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
      },
    }),
  ],
};
