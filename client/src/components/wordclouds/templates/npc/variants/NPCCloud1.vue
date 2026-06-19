<template>
  <WordCloud :items="descriptorConfigs" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WordCloud from '../../../word-cloud/WordCloud.vue'

import type { WordCloudItem } from '../../../word-cloud/word-cloud'

const descriptorConfigs = ref<WordCloudItem[]>([
  { id: "name", type: 'nameAll', color: 'pink' },
  { id: "color", type: 'colorAll', color: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'] },
  { id: "adjective", type: 'adjectivePerson', color: 'green' },
  { id: "trade", type: 'tradeAll', color: 'blue' },
  { id: "animal", type: 'animal', color: 'orange' },
  { id: "structure", type: 'structure', color: 'red' },
  { id: "item", type: 'itemAll', color: 'purple' }
])

</script>