module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    '../../.eslintrc.js'
  ],
  rules: {
    'import/default': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
