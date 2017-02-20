# cname-webpack-plugin

Create CNAME file for production build.

# Installation

```sh
npm i cname-webpack-plugin -D
```

In your webpack.config.js

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