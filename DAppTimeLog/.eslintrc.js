module.exports = {
  "env": {
    "browser": true,
  },
  "extends": [
    "@metamask/eslint-config",
    "@metamask/eslint-config/config/nodejs"
  ],  
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "indent": [1, 2, {"SwitchCase": 1}],
    "spaced-comment": ["error", "ignore"]
  }
}
