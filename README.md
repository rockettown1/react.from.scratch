## Setting up a BASIC React project from scratch

There are many different ways to set up a React application from scratch. There are different bundlers you and dev servers you can use, all with different pros/cons (eg rollup, parcel, esbuild, webpack) - this config here uses webpack.

### Generic project start
```npm init```
```git init```
Create a ```.gitignore``` file and add node_modules to it


### Dependencies you will need for this project
- the React and React DOM packages ```npm i react react-dom```
- Babel (optional if using TS) ```npm i @babel/core @babel/preset-env @babel/preset-react babel-loader```
- Webpack ```npm i webpack webpack-cli webpack-dev-server```
- HTML plugin for webpack ```npm i html-webpack-plugin --save-dev```
- Styled Components (optional choice) ```npm i styled-components```
- types if using styled components ```npm i --save-dev @types/styled-components```

Additional stuff if you are using TS
- TypeScript```npm i typescript --save-dev```
- ts-loader for webpack (if you're not going to use babel) ```npm i --save-dev ts-loader```
- if you are still using babel then grab the typescript preset ```npm i @babel/preset-typescript``` and include it in your .babelrc file
- ```npm i --save-dev @types/react @types/react-dom```


### Configure Babel

Create a .babelrc file in your main directory and add the following content:

```json
{
  "presets": ["@babel/preset-react", "@babel/preset-env"]
}
```

### Configure Webpack (basic)

Create a webpack.config.js file in your main directory and add the following content:

```js
  const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  // entry: "./src/index.tsx", <-- if using TS
  mode: "development"
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      //if using TS use the below rather than above
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: require.resolve("ts-loader"),
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
    ],
  },
};
```

You will need to install the loaders for styles (if using plain css files) and files for images etc
```npm i style-loader css-loader file-loader --save-dev```

### Create a src folder
- index.js setup (root js file) or .tsx if using TS
- App.js file or .tsx if using TS
- index.html file, empty div with "root" as the id

If using tsx files you may come across a type error with React 18's createRoot method, you just need to cast your DOM node as a HTMLElement

```tsx 

//index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### add scripts to your package.json file
```json
 "scripts": {
    "start": "webpack-dev-server --hot --open",
    "build": "webpack --config webpack.config.js --mode production"
  },
```

### Configure TypeScript
Run ```npx tsc --init``` which will generate you a tsconfig.json file and set the following properties:
```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

Note: if you're using ts-loader and typescript to transpile your ts/tsx to js, then you don't need babel at all.

However, if you're planning on doing SSR then the babel plugin for styled components might be required

I will add more to this about setting up Jest and React-Testing-Library


### Up to this point client-side React should work as intended.

# Server Side Rendering

There are many different ways to render React components on the server. This setup will use streams, served from an express.js server.

[React Docs for SSR](https://reactjs.org/docs/react-dom-server.html)

Note: At the time of writing this ```renderToNodeStream()``` is now deprecated, so we'll be looking at ```renderToPipeableStream()```