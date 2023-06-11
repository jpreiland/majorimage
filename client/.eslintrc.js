module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "plugin:vue/recommended"],
  overrides: [
  ],
  parser: 'vue-eslint-parser',
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
    'vue/max-attributes-per-line': 0,
    'vue/no-template-key': 0,
    'vue/no-v-for-template-key': 0,
    'vue/multi-word-component-names': 0
  },
};
