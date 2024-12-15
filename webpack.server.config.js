const path = require( "path" );
const nodeExternals = require( "webpack-node-externals" );

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/server.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "server.bundle.js",
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
};
