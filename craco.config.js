const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Production optimizations only
      if (webpackConfig.mode === "production") {
        // Optimize CSS
        webpackConfig.optimization.minimizer.push(
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                  normalizeWhitespace: false,
                },
              ],
            },
          }),
        );

        //  Terser configuration
        webpackConfig.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: [
                  "console.info",
                  "console.debug",
                  "console.warn",
                  "console.log",
                ],
                pure_getters: true,
                keep_infinity: true,
                passes: 3,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            parallel: true,
            extractComments: false,
          }),
        );

        //  code splitting
        webpackConfig.optimization.splitChunks = {
          chunks: "all",
          minSize: 10000, // Reduced from 20000
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: "~",
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                )[1];
                return `vendor.${packageName.replace("@", "")}`;
              },
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "react",
              chunks: "all",
              priority: 40,
            },
            commons: {
              name: "commons",
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        };

        // compression
        webpackConfig.plugins.push(
          new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/,
            threshold: 4096, // Reduced from 10kb to 4kb
            minRatio: 0.8,
            deleteOriginalAssets: false, // Keep original files for legacy browsers
          }),
        );

        // Add bundle analyzer in analyze mode
        if (process.env.ANALYZE) {
          webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              reportFilename: "bundle-report.html",
            }),
          );
        }

        // Modify the file-loader for images
        const imageRule = webpackConfig.module.rules.find(
          (rule) => rule.test && rule.test.test(".svg"),
        );
        if (imageRule) {
          imageRule.use = [
            {
              loader: require.resolve("url-loader"),
              options: {
                limit: 8192, // Inline images < 8kb
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ];
        }
      }

      return webpackConfig;
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      devMiddleware: {
        ...devServerConfig.devMiddleware,
        writeToDisk: true,
      },
    };
  },
  // Add Jest configuration for optimized testing
  jest: {
    configure: {
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  },
};
