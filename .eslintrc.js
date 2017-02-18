module.exports = {
  "root": true,
  "extends": "standard",
  "parserOptions": {
    "ecmaVersion": 2015
  },
  "env": {
    "browser": true
  },
  "plugins": [
    "html"
  ],
  "rules": {
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "never"
    }]
  }
}
