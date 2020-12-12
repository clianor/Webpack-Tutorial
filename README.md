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
  // webpack5에서 [DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.
  // 라는 버그가 경고가 발생한다면 아래와 같이 @next 버전 설치 아니라면 @next 제외하고 설치
  npm i -D html-loader html-webpack-plugin@next
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

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i react react-dom
npm i -D @babel/preset-react
```

```js
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
</details>

### webpack-dev-server 설정

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i -D webpack-cli webpack-dev-server @webpack-cli/serve
```

```json
"scripts": {
  "build": "webpack",
  "start:dev": "webpack serve --progress"
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
    open: true,
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
</details>

### css-loader 설정

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i -D mini-css-extract-plugin css-loader
```

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
...

rules: [
  ...
  {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
],
...
plugins: [
  ...
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css",
  }),
],
```
</details>

### 웹팩 로더와 플러그인의 차이

<details>
<summary>접기/펼치기 버튼</summary>

웹팩의 로더와 플러그인의 차이는 간단하다 차이는 다음과 같다.

로더는 웹팩이 이해할 수 있게 비 자바스크립트 파일을 변환하여 웹팩이 읽을 수 있게 한다.
플러그인은 번들된 결과물을 처리하는데 이는 간단히 생각하면 추출된 결과물은 플러그인을 통해 만들어진다고 생각하면 된다.
</details>

### SCSS 설정

<details>
<summary>접기/펼치기 버튼</summary>

```
npm install -D sass-loader sass
```

```js
// webpack.config.js
rules: [
  ...
  // 기존
  {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
  // 변경후
  {
    test: /\.(sa|sc|c)ss$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  },
],
...
```
</details>

### 사용되지 않는 파일 제거 clean-webpack-plugin 설정

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i -D clean-webpack-plugin
```

```js
// webpack.config.js
...
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
...
plugins: [
  new CleanWebpackPlugin(),
  ...
],
...
```

</details>

### 타입스크립트 설정

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i -D typescript@4.0.5 ts-loader @types/react @types/react-dom
npx tsconfig.json
// react 선택
```

```json
// tsconfig.json
{
  ...
  "include": [
    "src"
  ],
  ...
}
```

```js
// webpack.config.js
...
entry: "./src/index.tsx",
...
rules: [
  ...
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },
]
...
resolve: {
  extensions: [".tsx", ".ts", ".js", ".jsx"],
},
...
```
</details>

### 설정 분리

<details>
<summary>접기/펼치기 버튼</summary>

```js
// config/webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
  },
  mode: "none",
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
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
```

```js
// webpack.config.prod.js
const webpackConfig = require("./webpack.config");

module.exports = {
  ...webpackConfig,
  mode: "production",
};
```

```js
// webpack.config.dev.js
const path = require("path");
const webpackConfig = require("./webpack.config");

module.exports = {
  ...webpackConfig,
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 3000,
    hot: true,
    overlay: true, // 빌드시 에러나 경고를 브라우져 화면에 표시한다.
    stats: "errors-only",
    historyApiFallback: true, // 404 발생시 index.html로 리다이렉트
  },
  mode: "development",
};

```
</details>

### React 절대 경로 import

<details>
<summary>접기/펼치기 버튼</summary>

```js
// config/webpack.config.js
...
resolve: {
  extensions: [".tsx", ".ts", ".js", ".jsx"],
  alias: {
    src: path.resolve(__dirname, "../src"),
  },
},
...
```
</details>

### TypeScript 모듈 기본 내보내기

<details>
<summary>접기/펼치기 버튼</summary>

`"allowSyntheticDefaultImports": true`
export default 를 export 한 값들을 가지는 객체로 설정

```json
// tsconfig.json
{
  ...
  "compilerOptions": {
    ...
    "allowSyntheticDefaultImports": true
  }
  ...
}
```
</details>

### 최적화 설정 (optimize-css-assets-webpack-plugin, postcss-safe-parser)

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i -D optimize-css-assets-webpack-plugin postcss-safe-parser
```

```js
// config/webpack.config.js
...
output: {
  filename: "js/[contenthash].bundle.js",
  path: path.resolve(__dirname, "../dist"),
  publicPath: "/",
},
...
```

```js
// webpack.config.prod.js
const webpackConfig = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");

module.exports = {
  ...webpackConfig,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        parallel: true,
        extractComments: false,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            inline: false,
            annotation: true,
          },
        },
        cssProcessorPluginOptions: {
          preset: ["default", { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
  },
  mode: "production",
};
```
</details>

### file-loader 설정

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i -D file-loader
```

```js
//config/webpack.config.js
...
rules: [
  ...
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
    },
  },
  ...
],
...
```

```json
// tsconfig.json
{
  "compilerOptions": {
    ...
    "typeRoots": [
      "./node_modules/@types",
      "./src/@types"
    ]
  },
  ...
}
```

```ts
// src/@types/import-image.d.ts
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}
```

```tsx
// src/components/Contents.tsx
import React from "react";
import Image from "src/assets/books.jpg";

function Contents() {
  return <img src={Image} />;
}

export default Contents;
```
</details>

### eslint-webpack-plugin, eslint-config-react-app 설정

<details>
<summary>접기/펼치기 버튼</summary>

```
npm i -D eslint eslint-webpack-plugin
npm i -D eslint-config-react-app @typescript-eslint/eslint-plugin@^4.0.0 @typescript-eslint/parser@^4.0.0 babel-eslint@^10.0.0 eslint@^7.5.0 eslint-plugin-flowtype@^5.2.0 eslint-plugin-import@^2.22.0 eslint-plugin-jsx-a11y@^6.3.1 eslint-plugin-react@^7.20.3 eslint-plugin-react-hooks@^4.0.8
```

```js
// config/webpack.config.js
...
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  ...
  plugins: [
    ...
    new ESLintPlugin({
      extensions: ["tsx", "ts", "js", "jsx"],
      exclude: "node_modules",
      emitError: true,
      emitWarning: true,
      failOnError: false,
      failOnWarning: false,
    }),
  ],
};
```

```json
// .eslintrc.json
{
  "extends": "react-app"
}
```
</details>

### Environment variables

<details>
<summary>접기/펼치기 버튼</summary>
환경 변수를 설정할 때 지켜야 하는 규칙만들기

```
npm i -D dotenv
```

```js
// config/webpack.config.js
require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

function getClientEnv() {
  return {
    "process.env": JSON.stringify(
      Object.keys(process.env)
        .filter((key) => /^REACT_APP/i.test(key))
        .reduce((env, key) => {
          env[key] = process.env[key];
          return env;
        }, {})
    ),
  };
}

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "js/[contenthash].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  mode: "none",
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "../src"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new ESLintPlugin({
      extensions: ["tsx", "ts", "js", "jsx"],
      exclude: "node_modules",
      emitError: true,
      emitWarning: true,
      failOnError: false,
      failOnWarning: false,
    }),
    new webpack.DefinePlugin(getClientEnv()),
  ],
};
```
</details>

### webpack-manifest-plugin 셋팅

<details>
<summary>접기/펼치기 버튼</summary>

브라우저 캐싱 때문에 manifest 추가

```
npm i -D webpack-manifest-plugin
```

```js
// config/webpack.config.prod.js
...
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  ...
  plugins: [
    ...webpackConfig.plugins,
    new WebpackManifestPlugin({ fileName: "webpack.manifest.js" }),
  ],
};
```
</details>

### Bundle Analyzer 셋팅

<details>
<summary>접기/펼치기 버튼</summary>

어떤 부분을 코드 스플리팅 해야하는지 분석해주는 분석기 webpack-bundle-analyzer 셋팅

```
npm i -D webpack-bundle-analyzer
```

```js
// config/webpack.config.prod.analyzer.js 참고
...
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  ...
  plugins: [
    ...
    new BundleAnalyzerPlugin(),
  ],
  ...
};
```
</details>