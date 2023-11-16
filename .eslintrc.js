module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-extra-boolean-cast': 'warn',
    /**
     * It should be opened. But there are many place to fix. So temporary comment this line.
     */
    //'no-unused-vars': 'error',
  },
};
