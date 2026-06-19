<template>
  <WordCloud :items="descriptorConfigs" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WordCloud from '../../../word-cloud/WordCloud.vue'

import type { WordCloudItem } from '../../../word-cloud/word-cloud'

const descriptorConfigs = ref<WordCloudItem[]>([
  { id: "temple-name", component: 'descriptor', type: 'Temple', color: 'green' },
  { id: "color", component: 'simple', type: 'colorAll', color: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'] },
  { id: "adjective", component: 'simple', type: 'adjectivePerson', color: 'black' },
  { id: "trade", component: 'simple', type: 'tradeAll', color: 'blue' },
  { id: "animal", component: 'simple', type: 'animal', color: 'orange' },
  { id: "structure", component: 'simple', type: 'structure', color: 'red' },
  { id: "item", component: 'simple', type: 'itemAll', color: 'purple' }
])

</script>