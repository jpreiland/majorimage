<template>
  <div>
    <span class="button is-info rerollRow" @click="$emit('rerollRow', rowId)">➔</span>
    <span class="button descriptor effect" v-if="displayedDescriptors.effect" @click="$emit('pickEffect', rowId)" >{{effect}}</span>
    <span class="button descriptor quality" v-if="displayedDescriptors.quality" @click="$emit('pickQuality', rowId)" >{{quality}}</span>
    <span class="button descriptor color" v-if="displayedDescriptors.color" @click="$emit('pickColor', rowId)" >{{color}}</span>
    <span class="button descriptor material" v-if="displayedDescriptors.material" @click="$emit('pickMaterial', rowId)">{{material}}</span>
    <span class="button descriptor item" v-if="displayedDescriptors.item" @click="$emit('pickItem', rowId)">{{item}}</span>
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
    emits: ['rerollRow', 'pickEffect', 'pickQuality', 'pickColor', 'pickMaterial', 'pickItem']
  }
</script>