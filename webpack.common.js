const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

exports.mainConfig = {
  target: 'electron-main',
  entry: {
    "main": './src/main/index.js'
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets"),
    publicPath: "/assets/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },  
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/index.html', to: '../'},
      { from: 'src/package.json', to: '../'},
    ]),
  ]
};

exports.rendererConfig = {
  target: 'electron-renderer',
  entry: {
    "index": './src/renderer/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets"),
    publicPath: "/assets/",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          //MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: './images',
          },
        }
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};

//module.exports = [mainConfig, rendererConfig];

// module.exports = {
//   entry: {
//     index: "./src/index.ts",
//   },
//   output: {
//     path: path.resolve(__dirname, "./dist/assets"),
//     publicPath: "/assets/",
//     filename: "[name].js"
//   },
//   resolve: {
//     extensions: [".tsx", ".ts", ".js", ".json"]
//   },
//   target: 'electron-renderer',
//   module: {
//     rules: [
//       {
//         test: /\.ts(x?)$/,
//         use: [
//           {
//             loader: "ts-loader"
//           }
//         ]
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           // "style-loader",
//           MiniCssExtractPlugin.loader,
//           {
//             loader: "css-loader",
//             options: {
//               sourceMap: true,
//               importLoaders: 2
//             }
//           },
//           {
//             loader: "postcss-loader",
//             options: {
//               sourceMap: true,
//               plugins: [
//                 require("autoprefixer")({
//                   grid: true
//                 })
//               ]
//             }
//           },
//           {
//             loader: "sass-loader",
//             options: {
//               sourceMap: true
//             }
//           },
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif)$/i,
//         use: {
//           loader: "file-loader",
//           options: {
//             outputPath: './images',
//           },
//         }
//       },
//     ]
//   },

//   plugins: [
//     new CleanWebpackPlugin(),
//     new MiniCssExtractPlugin(),
//     new CopyPlugin([
//       { from: 'src/index.html', to: '../'},
//       { from: 'src/package.json', to: '../'},
//     ]),
//   ]

//   // When importing a module whose path matches one of the following, just
//   // assume a corresponding global variable exists and use that instead.
//   // This is important because it allows us to avoid bundling all of our
//   // dependencies, which allows browsers to cache those libraries between builds.
//   // externals: {
//   //   react: "React",
//   //   "react-dom": "ReactDOM"
//   // }
// };
