[![Build Status](https://img.shields.io/travis/lozinsky/cname-webpack-plugin/master.svg?style=flat-square)](https://travis-ci.org/lozinsky/cname-webpack-plugin)
[![npm version](https://img.shields.io/npm/v/cname-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/cname-webpack-plugin)
[![Dependencies Status](https://david-dm.org/lozinsky/cname-webpack-plugin/status.svg?style=flat-square)](https://david-dm.org/lozinsky/cname-webpack-plugin)
[![DevDependencies Status](https://david-dm.org/lozinsky/cname-webpack-plugin/dev-status.svg?style=flat-square)](https://david-dm.org/lozinsky/cname-webpack-plugin?type=dev)

# cname-webpack-plugin

[![Greenkeeper badge](https://badges.greenkeeper.io/lozinsky/cname-webpack-plugin.svg)](https://greenkeeper.io/)

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
            domain: 'example.com',
        }),
    ],
};
```