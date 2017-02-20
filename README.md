[![Build Status](https://travis-ci.org/lozinsky/cname-webpack-plugin.svg?branch=master)](https://travis-ci.org/lozinsky/cname-webpack-plugin)
[![npm version](https://img.shields.io/npm/v/cname-webpack-plugin.svg?style=flat)](https://www.npmjs.com/package/cname-webpack-plugin)
# cname-webpack-plugin

Create CNAME file for production build.

# Installation

```sh
npm i cname-webpack-plugin -D
```

In your ```webpack.config.js```

```javascript
const CnameWebpackPlugin = require('cname-webpack-plugin');

module.exports = {
    plugins: [
        new CnameWebpackPlugin({
            domain: 'example.com'
        }),
    ],
};
```