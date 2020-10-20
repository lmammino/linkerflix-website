'use strict'

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  },
  ignorePatterns: [
    '!.eleventy.js',
    'src/_includes/assets',
    'dist/',
    'node_modules/'
  ]
}
