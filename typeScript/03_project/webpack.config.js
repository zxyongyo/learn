// 引入nodejs的path包
const path = require('path');
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack 配置信息
module.exports = {
  mode: 'none',
  // 入口文件
  entry: './src/index.ts',
  // 打包后的文件位置
  output: {
    // 指定打包文件目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的名字
    filename: 'app.js',
    // 打包后不使用箭头函数
    environment: {
      arrowFunction: false
    }
  },
  // 指定webpack打包时要使用的模块
  module: {
    // 加载的规则
    rules: [
      // 处理ts js文件
      {
        // 指定规则生效的文件
        test: /\.ts$/,
        // 使用的loader  从后往前执行  先用ts-loader编译ts文件  再用babel-loader
        use: [
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      'chrome': '58',
                      'ie': '10'
                    },
                    'corejs': '3',
                    // 使用corejs的方式 usage按需加载
                    'useBuiltIns': 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 排除的文件
        exclude: /node-module/
      },
      // 处理less css文件
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            // 处理css兼容
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 兼容每种浏览器 最新的3个版本
                      browsers: 'last 3 version'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    // 用./index.html 作为模板
    new HtmlWebpackPlugin({template: "./index.html"}),
    // 打包时清除dist目录
    new CleanWebpackPlugin()
  ],
  // 设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}