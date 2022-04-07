module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks'],
  parser: '@babel/eslint-parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react',
  ],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'no-console': 'off',
    'max-params': ['error', 4],
    'function-paren-newline': ['error', 'consistent'],
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
  },
};
