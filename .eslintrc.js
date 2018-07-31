module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'eslint-config-airbnb-base',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['import', 'jest']
};
