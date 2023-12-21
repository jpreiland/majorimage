module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  parser: 'vue-eslint-parser',
  rules: {
    'vue/max-attributes-per-line': 0,
    'vue/no-template-key': 0,
    'vue/no-v-for-template-key': 0,
    'vue/multi-word-component-names': 0
  },
};
