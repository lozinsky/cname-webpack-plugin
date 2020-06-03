const fs = require('fs');
const path = require('path');
const util = require('util');
const rimraf = require('rimraf');
const webpack = util.promisify(require('webpack'));

const CnameWebpackPlugin = require('../..');

const tmpDirPath = path.join(__dirname, '.tmp');
const entryPath = path.join(tmpDirPath, 'index.js');
const distDirPath = path.join(tmpDirPath, 'dist');
const cnamePath = path.join(distDirPath, 'CNAME');

async function setup(pluginOptions) {
  await webpack({
    entry: entryPath,
    output: { path: distDirPath },
    plugins: [new CnameWebpackPlugin(pluginOptions)],
  });
}

beforeEach(() => {
  fs.mkdirSync(tmpDirPath);
  fs.writeFileSync(entryPath, '');
});

afterEach(() => {
  rimraf.sync(tmpDirPath);
});

it('creates the CNAME file correctly', async () => {
  const domain = 'domain.com';

  await setup({ domain });

  expect(fs.readFileSync(cnamePath, 'utf8')).toEqual(domain);
});

it('throws error if options are missing', async () => {
  try {
    await setup();
  } catch (error) {
    expect(error.message).toMatch('missing options');
  }

  expect(() => fs.accessSync(cnamePath)).toThrow();
});

it('throws error if domain is missing', async () => {
  try {
    await setup({ domain: undefined });
  } catch (error) {
    expect(error.message).toMatch('missing domain');
  }

  expect(() => fs.accessSync(cnamePath)).toThrow();
});
