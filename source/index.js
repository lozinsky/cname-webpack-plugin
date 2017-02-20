import { warning } from './utils';

class CnameWebpackPlugin {
    constructor({ domain } = { domain: null }) {
        this._domain = domain;
    }

    apply(compiler) {
        const domain = this._domain;

        if (domain) {
            const fileName = 'CNAME';

            compiler.plugin('emit', (compilation, compileCallback) => {
                compilation.assets[fileName] = {
                    source: () => domain,
                    size: () => domain.length,
                };

                compileCallback();
            });
        } else {
            warning('"domain" option is empty. Please enter "domain" option.');
        }
    }
}

export default CnameWebpackPlugin;
