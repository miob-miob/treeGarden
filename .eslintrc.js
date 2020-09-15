module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['eslint-plugin-import'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-multiple-empty-lines':[2, { "max": 2 }],
    "linebreak-style": [0],
    'import/no-default-export':2,
    'import/prefer-default-export':0,
    "comma-dangle": ["error", "never"],
    "max-len": ["error", { "code": 160 }]
  },
};
