const assert = require('assert').strict;

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
    compiler.hooks.emit.tapAsync('CnameWebpackPlugin', (compilation, done) => {
      compilation.assets.CNAME = {
        source: () => this.domain,
        size: () => this.domain.length,
      };

      done();
    });
  }
}

module.exports = CnameWebpackPlugin;
