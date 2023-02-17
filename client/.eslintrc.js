module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["vue", "standard", "plugin:vue/recommended"],
  overrides: [
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ["import", "vue"],
  rules: {
    'vue/no-template-key': 0
  },
};
