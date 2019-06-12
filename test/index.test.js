const fs = require('fs');
const path = require('path');
const util = require('util');
const rimraf = util.promisify(require('rimraf'));
const webpack = util.promisify(require('webpack'));

const CnameWebpackPlugin = require('../lib');

const fixtures = path.join(__dirname, 'fixtures');
const entry = path.join(fixtures, 'index.js');
const dist = path.join(fixtures, 'dist');
const cname = path.join(dist, 'CNAME');

async function runWebpack(pluginOptions) {
  await webpack({
    entry,
    output: { path: dist },
    plugins: [new CnameWebpackPlugin(pluginOptions)],
  });
}

afterEach(() => {
  return rimraf(dist);
});

it('creates the CNAME file correctly', async () => {
  const domain = 'domain.com';

  await runWebpack({ domain });

  expect(fs.promises.readFile(cname, 'utf8')).resolves.toEqual(domain);
});

it('throws error if options are missing', async () => {
  try {
    await runWebpack();
  } catch (error) {
    expect(error.message).toMatch('missing options');
  }

  expect(fs.promises.access(cname)).rejects.toThrow();
});

it('throws error if domain is missing', async () => {
  try {
    await runWebpack({ domain: undefined });
  } catch (error) {
    expect(error.message).toMatch('missing domain');
  }

  expect(fs.promises.access(cname)).rejects.toThrow();
});
