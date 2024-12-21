const path = require( "path" );
const webpack = require( "webpack" );
const TerserPlugin = require( "terser-webpack-plugin" );
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: isDev
    ? ["webpack-hot-middleware/client?reload=true", "./src/client.tsx"]
    : "./src/client.tsx",
  target: 'web',
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "[name].bundle.js",
    publicPath: "/static/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
