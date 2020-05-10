/*
 * @Description: eslint config
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 13:45:31
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "new-cap": ["error", {
      "newIsCap": false,
      "capIsNew": false
    }],
    'no-inner-declarations': 'off',
    'no-var': ['error']
  },
  'globals': {
    "AspCoreEditor": true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
