const configureBabelLoader = (browserList = []) => {
  return {
    test: /\.jsx?$/,
    exclude: settings.babelLoaderConfig.exclude,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            '@babel/preset-env',
            {
              exclude: [
                'transform-regenerator',
                'transform-async-to-generator',
              ], // to make fast-async work
              debug: !!isProduction,
              modules: false,
              corejs: 3, // the lastest corejs v3
              useBuiltIns: 'usage', // only polyfill what you use
              targets: {
                browsers: browserList, // this
              },
            },
          ],
        ],
        plugins: [
          '@babel/proposal-class-properties',
          '@babel/proposal-object-rest-spread',
          '@babel/plugin-syntax-dynamic-import',
          'module:fast-async', // faster non-generator transformation for async/await
        ],
      },
    },
  };
};
