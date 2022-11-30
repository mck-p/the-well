module.exports = {
  mode: "production",
  entry: {
    common: "./source/js/common.ts",
  },
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".json"],
  },
  devtool: "source-map",
};
