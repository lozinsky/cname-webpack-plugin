jest.mock('webpack', () => {
  const moduleNameByVersion = {
    '5.x': 'webpack',
    '4.x': 'webpack-4',
  };
  const version = process.env.WEBPACK_VERSION || '5.x';
  const moduleName = moduleNameByVersion[version];

  return jest.requireActual(moduleName);
});
