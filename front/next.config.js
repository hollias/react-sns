const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  distDir: '.next',
  webpack(config) {
    console.log('config', config);
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
    ];
    if(prod) {
      plugins.push(new CompressionPlugin()); //gzip을 이용해 용량을 1/3로 줄인다.
    }

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins
    };
  }
});