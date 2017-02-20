import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import del from 'del';

import Plugin from '../source';

const OUTPUT_DIR = path.join(__dirname, './output');

const createConfig = options => ({
    entry: './fixtures/file.js',
    output: {
        path: OUTPUT_DIR,
        filename: '[name].js',
    },

    plugins: [
        new Plugin(options),
    ],
});

describe('CNAME webpack plugin', () => {
    const CNAME = path.join(OUTPUT_DIR, 'CNAME');
    const start = cfg => (
        new Promise(resolve => webpack(cfg, resolve))
    );

    it('should create CNAME file', () => {
        const config = createConfig({
            domain: 'domain.com',
        });

        return start(config)
            .then(() => {
                const content = fs.readFileSync(CNAME, 'utf8');

                expect(content).toEqual('domain.com');
            });
    });

    it('warging should be shown', () => {
        const config = createConfig();
        console.warn = jest.fn();

        return start(config)
            .then(() => {
                const isCnameExist = fs.existsSync(CNAME);

                expect(console.warn).toBeCalled();
                expect(isCnameExist).toBeFalsy();
            });
    });

    afterEach(() => {
        del([OUTPUT_DIR]);
    });
});
