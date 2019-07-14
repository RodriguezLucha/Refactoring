'use strict';

module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'min',
  slow: 75,
  timeout: 1000,
  ui: 'bdd',
  recursive: true,
  spec: 'test/*'
};
