const fs = require('fs');
const path = require('path');
const util = require('util');
const rimraf = require('rimraf');
const webpack = require('webpack');
const Plugin = require('../index');

const pack = util.promisify(webpack);
const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(rimraf);

const tempPath = path.resolve(__dirname, '.test-tmp');
const cnamePath = path.join(tempPath, 'CNAME');

async function runWebpack(options) {
  const entry = path.join(tempPath, 'entry.js');

  await writeFile(entry, 'console.log();');
  await pack({
    entry,
    output: {
      path: tempPath,
    },

    plugins: [new Plugin(options)],
  });
}

async function mkTemp() {
  await mkdir(tempPath);
}

async function rmTemp() {
  await rmdir(tempPath);
}

beforeAll(rmTemp);
beforeEach(mkTemp);
afterEach(rmTemp);

test('should create the CNAME file correctly', async () => {
  const domain = 'domain.com';

  await runWebpack({
    domain,
  });

  expect(readFile(cnamePath, 'utf8')).resolves.toEqual(domain);
});

test('the warning message should be shown', async () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  await runWebpack();

  expect(warnSpy).toBeCalled();
  expect(exists(cnamePath)).resolves.toBeFalsy();
});
