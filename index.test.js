const fs = require('fs');
const { resolve, join } = require('path');
const { promisify } = require('util');
const webpack = require('webpack');
const del = require('del');

const CnameWebpackPlugin = require('./index');

const pack = promisify(webpack);
const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const tempPath = resolve('temp');
const cnamePath = join(tempPath, 'CNAME');

async function runWebpack(options) {
  const entry = join(tempPath, 'entry.js');

  await writeFile(entry, 'console.log();');
  await pack({
    entry,
    output: {
      path: tempPath,
    },

    plugins: [new CnameWebpackPlugin(options)],
  });
}

async function mkTemp(done) {
  await mkdir(tempPath);
  done();
}

async function rmTemp(done) {
  await del(tempPath);
  done();
}

beforeAll(rmTemp);
beforeEach(mkTemp);
afterEach(rmTemp);

test('should create the CNAME file correctly', async done => {
  const domain = 'domain.com';

  await runWebpack({
    domain,
  });

  expect(await readFile(cnamePath, 'utf8')).toEqual(domain);

  done();
});

test('the warning message should be shown', async done => {
  console.warn = jest.fn();

  await runWebpack();

  expect(console.warn).toBeCalled();
  expect(await exists(cnamePath)).toBeFalsy();

  done();
});
