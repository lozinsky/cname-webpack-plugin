[![build-status](https://img.shields.io/travis/lozinsky/cname-webpack-plugin/master.svg?style=flat-square)](https://travis-ci.org/lozinsky/cname-webpack-plugin)
[![npm-version](https://img.shields.io/npm/v/cname-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/cname-webpack-plugin)

# cname-webpack-plugin

Create CNAME file for production build.

## Installation

```sh
npm i cname-webpack-plugin -D
```

In your `webpack.config.js`

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

## Donations

If you would like to show appreciation for my work, I would gladly accept a small donation!

I will accept donations through PayPal.Me or Buy Me a Coffee.

[![Buy Me a Coffee](https://imgur.com/pp8bBTQ.png)](https://buymeacoffee.com/lozinsky)
[![PayPal.Me](https://imgur.com/4QfPHwi.png)](https://paypal.me/lozinsky)
