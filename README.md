# cname-webpack-plugin &middot; [![CI](https://github.com/lozinsky/cname-webpack-plugin/workflows/CI/badge.svg)](https://github.com/lozinsky/cname-webpack-plugin/actions?workflow=CI) [![npm version](https://img.shields.io/npm/v/cname-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/cname-webpack-plugin)

Create the CNAME file for your production build.

## Installation

```sh
npm i cname-webpack-plugin -D
```

or

```sh
yarn add cname-webpack-plugin -D
```

Add to your `webpack.config.js` file:

```javascript
const CnameWebpackPlugin = require('cname-webpack-plugin');

module.exports = {
  plugins: [
    new CnameWebpackPlugin({
      domain: 'example.com',
    }),
  ],
};
```
