class CnameWebpackPlugin {
  constructor(options = {}) {
    this.domain = options.domain;
  }

  apply(compiler) {
    if (this.domain) {
      this.registerCname(compiler);
    } else {
      CnameWebpackPlugin.domainWarn();
    }
  }

  registerCname(compiler) {
    const { name } = this.constructor;

    compiler.hooks.emit.tapAsync(name, (compilation, done) => {
      compilation.assets.CNAME = {
        source: () => this.domain,
        size: () => this.domain.length,
      };

      done();
    });
  }

  static domainWarn() {
    const { name } = this;

    console.warn(
      `${name}: "domain" option is empty. Please enter the "domain" option.`,
    );
  }
}

module.exports = CnameWebpackPlugin;
