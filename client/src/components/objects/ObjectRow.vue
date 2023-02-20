<template>
  <div>
    <span class="button is-info rerollRow" @click="$emit('reroll-row', rowId)">➔</span>
    <span class="button descriptor effect" v-if="displayedDescriptors.effect" @click="$emit('pick-effect', rowId)" >{{effect}}</span>
    <span class="button descriptor quality" v-if="displayedDescriptors.quality" @click="$emit('pick-quality', rowId)" >{{quality}}</span>
    <span class="button descriptor color" v-if="displayedDescriptors.color" @click="$emit('pick-color', rowId)" >{{color}}</span>
    <span class="button descriptor material" v-if="displayedDescriptors.material" @click="$emit('pick-material', rowId)">{{material}}</span>
    <span class="button descriptor item" v-if="displayedDescriptors.item" @click="$emit('pick-item', rowId)">{{item}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      rowId: Number,
      displayedDescriptors: Object,
      effect: String,
      quality: String,
      color: String,
      material: String,
      item: String
    },
    emits: ['reroll-row', 'pick-effect', 'pick-quality', 'pick-color', 'pick-material', 'pick-item']
  }
</script>