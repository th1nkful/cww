module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    requireConfigFile: false,
  },
  plugins: [],
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-console': 'off',
    'max-params': ['error', 4],
    'function-paren-newline': ['error', 'consistent'],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        'jest/globals': true,
      },
      plugins: [
        'jest',
        'jest-formatting',
      ],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
      ],
      rules: {
        'jest-formatting/padding-around-all': 1,
        'jest/consistent-test-it': ['error', { fn: 'it' }],
        'jest/prefer-lowercase-title': [
          'error', {
            ignore: ['describe'],
            allowedPrefixes: ['GET', 'POST', 'DELETE'],
          },
        ],
      },
    },
  ],
};
