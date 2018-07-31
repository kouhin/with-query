module.exports = {
  root: true,
  extends: [
    'eslint-config-airbnb-base',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['import', 'jest']
};
