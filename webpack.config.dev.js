const path = require("path");

const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve("src/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    publicPath: "/"
  },
  devtool: "inline-source-map",
  mode: "development",
  resolve: {
    modules: [path.resolve("node_modules/"), path.resolve("src/")],
    extensions: [".js", ".json", ".ts", ".tsx"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      components: path.resolve(__dirname, "src/components/"),
      theme: path.resolve(__dirname, "src/theme/"),
      routers: path.resolve(__dirname, "src/routers/"),
      constants: path.resolve(__dirname, "src/constants/"),
      state: path.resolve(__dirname, "src/state/"),
      request: path.resolve(__dirname, "src/request/"),
      interface: path.resolve(__dirname, "src/interface/"),
      utility: path.resolve(__dirname, "src/utility/"),
      helper: path.resolve(__dirname, "src/helper/")
    }
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",

      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", {
          loader: "less-loader",
          options: {
            includePaths: [path.resolve(__dirname, 'node_modules')],
            sourceMap: true,
            javascriptEnabled: true,
            modifyVars: {
              "primary-color": '#722ed1'
            }
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[hash].[ext]",
            outputPath: "fonts/"
          }
        }]
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[hash].[ext]",
            outputPath: "images/"
          }
        }]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      },
    ]
  },
  plugins: [new Dotenv()],
  devServer: {
    contentBase: path.resolve("."),
    compress: true,
    port: 3000,
    watchOptions: {
      ignored: /node_modules/
    },
    watchContentBase: true,
    historyApiFallback: true
  }
};