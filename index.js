const assert = require('assert').strict;
const webpack = require('webpack');

/**
 * @typedef {import('webpack').Compiler} WebpackCompiler
 */

class CnameWebpackPlugin {
  /**
   * @param {object} options Plugin options.
   * @param {string} options.domain CNAME file content.
   */
  constructor(options) {
    assert(options, 'CnameWebpackPlugin: missing options');
    assert(options.domain, 'CnameWebpackPlugin: missing domain');

    this.domain = options.domain;
  }

  /**
   * @param {WebpackCompiler} compiler
   *
   * @returns {void}
   */
  apply(compiler) {
    compiler.hooks.compilation.tap('CnameWebpackPlugin', (compilation) => {
      compilation.hooks.additionalAssets.tap('CnameWebpackPlugin', () => {
        compilation.emitAsset('CNAME', new webpack.sources.RawSource(this.domain));
      });
    });
  }
}

class CnameWebpack4Plugin extends CnameWebpackPlugin {
  /**
   * @param {WebpackCompiler} compiler
   *
   * @returns {void}
   */
  apply(compiler) {
    compiler.hooks.emit.tapAsync('CnameWebpackPlugin', (compilation, done) => {
      compilation.assets.CNAME = {
        source: () => this.domain,
        size: () => this.domain.length,
      };

      done();
    });
  }
}

module.exports = webpack.version.startsWith('4') ? CnameWebpack4Plugin : CnameWebpackPlugin;
