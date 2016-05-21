const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const mapValues = require('lodash/mapValues');

module.exports = Object.assign({},
  baseConfig,
  {
    devtool: 'cheap-module-eval-source-map',
    entry: mapValues(baseConfig.entry, entry => ([
      'webpack-hot-middleware/client',
      ...entry,
    ])),
    output: Object.assign({},
      baseConfig.output,
      { path: '/assets' },
    ),
    module: Object.assign({}, baseConfig.module,
      { loaders: [
        Object.assign({}, baseConfig.module.loaders[0], {
          loader: [
            'react-hot-loader',
            ...baseConfig.module.loaders[0].loader,
          ],
        }),
        ...baseConfig.module.loaders.slice(1, baseConfig.module.loaders.length),
      ] },
    ),
    plugins: [
      ...baseConfig.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  },
);
