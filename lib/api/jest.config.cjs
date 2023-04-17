/** @type {import('jest').Config} */
module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  reporters: ['default', ['github-actions', { silent: false }], 'summary']
}
