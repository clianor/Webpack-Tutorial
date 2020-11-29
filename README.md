# 웹팩 튜토리얼

## 웹팩 기본

### 웹팩 다운로드

```
npm i -D webpack webpack-cli
```

### index.html과 index.js 생성

<details>
<summary>접기/펼치기 버튼</summary>


  ```html
  <!-- public/index.html -->
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Webpack App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body>
    <script src="index.js"></script></body>
  </html>
  ```

  ```js
  // src/index.js
  alert("Hello World");
  ```
</details>


### webpack.config.js 생성 및 html-loader, HtmlWebPackPlugin 추가

<details>
<summary>접기/펼치기 버튼</summary>


  ```
  npm i -D html-loader html-webpack-plugin
  ```
  html-loader
  - html 파일에 선언된 URL 과 이미지 등 사용자가 필요한 요소를 파싱함

  HtmlWebPackPlugin
  - html-loader가 읽은 내용을 이용하여 html 파일을 생성하도록 함

  ```js
  // webpack.config.js
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const path = require("path");

  module.exports = {
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
    mode: "none",
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin()],
  };
  ```
</details>

### babel-loader 설정

<details>
<summary>접기/펼치기 버튼</summary>



  ```
  npm install -D babel-loader @babel/core @babel/preset-env
  ```

  ```
  // webpack.config.js
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const path = require("path");

  module.exports = {
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
    mode: "none",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            minimize: true,
          },
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin()],
  };
  ```
</details>

### React 설정


```
npm i react react-dom
npm i -D @babel/preset-react
```

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

### webpack-dev-server 설정


`Error: Cannot find module ‘webpack-cli/bin/config-yargs’` 가 발생하여 아래와 같이 작업
```
npm un webpack-cli
npm i -DE webpack-cli@3.3.11 webpack-dev-server@3.7.1
```

```json
"scripts": {
  "build": "webpack",
  "start:dev": "webpack-dev-server --open"
},
```

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
    overlay: true, // 빌드시 에러나 경고를 브라우져 화면에 표시한다.
    stats: "errors-only",
    historyApiFallback: true, // 404 발생시 index.html로 리다이렉트
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
};
```