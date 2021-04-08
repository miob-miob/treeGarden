module.exports = {
  extends: "airbnb-typescript/base",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  ignorePatterns:['./dist/**','./node_modules/**'],
  plugins: ['eslint-plugin-import'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-multiple-empty-lines':[2, { "max": 2 }],
    "linebreak-style": [0],
    'import/no-default-export':2,
    'import/prefer-default-export':0,
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "max-len": ["error", { "code": 160 }],
    'no-unused-vars': ["error", { "args": "none" }]
  },
};
