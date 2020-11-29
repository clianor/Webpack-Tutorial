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