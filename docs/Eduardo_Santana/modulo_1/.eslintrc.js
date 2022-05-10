module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx'] },
    ],
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
  },
};
