const production = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': production ? 'warn' : 'off',
    'no-debugger': production ? 'warn' : 'off',
    'no-unused-vars': production ? 'warn' : 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': production ? 'warn' : 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  }
}
