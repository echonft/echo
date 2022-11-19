module.exports = {
  extends: ['../.eslintrc.js'],
  rules: {
    'no-console': 'off'
  },
  env: {
    node: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  }
}
