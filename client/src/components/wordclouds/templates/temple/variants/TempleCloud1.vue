<template>
  <WordCloud :items="descriptorConfigs" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WordCloud from '../../../word-cloud/WordCloud.vue'

import type { WordCloudItem } from '../../../word-cloud/word-cloud'

const descriptorConfigs = ref<WordCloudItem[]>([
  { id: "temple-name", component: 'descriptor', type: 'Temple', color: 'green' },
  { id: "color", component: 'simple', type: 'colorAll', color: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'], properNoun: true },
  { id: "adjective", component: 'simple', type: 'adjectivePerson', color: 'black', properNoun: true  },
  { id: "trade", component: 'simple', type: 'tradeAll', color: 'blue', properNoun: true  },
  { id: "animal", component: 'simple', type: 'animal', color: 'orange', properNoun: true  },
  { id: "structure", component: 'simple', type: 'structure', color: 'red', properNoun: true  },
  { id: "item", component: 'simple', type: 'itemAll', color: 'purple', properNoun: true  }
])

</script>