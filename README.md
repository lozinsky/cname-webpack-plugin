# cname-webpack-plugin &middot; [![CI](https://github.com/lozinsky/cname-webpack-plugin/workflows/CI/badge.svg)](https://github.com/lozinsky/cname-webpack-plugin/actions?workflow=CI) [![CD](https://github.com/lozinsky/cname-webpack-plugin/workflows/CD/badge.svg)](https://github.com/lozinsky/cname-webpack-plugin/actions?workflow=CD) [![npm version](https://img.shields.io/npm/v/cname-webpack-plugin.svg)](https://www.npmjs.com/package/cname-webpack-plugin)

Create a CNAME file with webpack.

## Installation

```sh
npm i cname-webpack-plugin -D
```

## Usage

Add to `webpack.config.js`:

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
