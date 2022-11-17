module.exports = {
  extends: ['../.eslintrc.js', 'plugin:import/recommended', 'plugin:import/typescript'],
  rules: {
    'import/no-unresolved': 'off'
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
