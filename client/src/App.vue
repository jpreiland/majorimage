<template>
  <div id="app">
    Major Image
    <div class="control">
      <a class="button is-danger" v-bind:class="{ 'is-light': !displayedDescriptors.quality }" @click="toggleQuality">Quality</a>
      <a class="button is-success" v-bind:class="{ 'is-light': !displayedDescriptors.color }" @click="toggleColor">Color</a>
      <a class="button is-warning" v-bind:class="{ 'is-light': !displayedDescriptors.material }" @click="toggleMaterial">Material</a>
    </div>
    <div class="control">
      <a class="button" v-bind:class="{ 'is-light': !params.isArmor }" @click="toggleItemType('isArmor')">Armor</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isClothing }" @click="toggleItemType('isClothing')">Clothing</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isContainer }" @click="toggleItemType('isContainer')">Container</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isFurniture }" @click="toggleItemType('isFurniture')">Furniture</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isMisc }" @click="toggleItemType('isMisc')">Misc</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isTreasure }" @click="toggleItemType('isTreasure')">Treasure</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isWeapon }" @click="toggleItemType('isWeapon')">Weapon</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isWriting }" @click="toggleItemType('isWriting')">Writing</a>
    </div>
    <div v-if="initialized">
      <span class="button is-info rerollRow" @click="rerollRow(0)">➔</span>
      <span class="button qualityName" v-if="displayedDescriptors.quality" @click="pickQuality(0)" :key="displayedQualities[0].name">{{displayedQualities[0].name}}</span>
      <span class="button colorName" v-if="displayedDescriptors.color" @click="pickColor(0)" :key="displayedColors[0].name">{{displayedColors[0].name}}</span>
      <span class="button materialName" v-if="displayedDescriptors.material" @click="pickMaterial(0)" :key="displayedMaterials[0].name">{{displayedMaterials[0].name}}</span>
      <span class="button itemName" v-if="displayedDescriptors.item" @click="pickItem(0)" :key="displayedItems[0].name">{{displayedItems[0].name}}</span>
    </div>
    <div v-if="initialized">
      <span class="button is-info rerollRow" @click="rerollRow(1)">➔</span>
      <span class="button qualityName" v-if="displayedDescriptors.quality" @click="pickQuality(1)" :key="displayedQualities[1].name">{{displayedQualities[1].name}}</span>
      <span class="button colorName" v-if="displayedDescriptors.color" @click="pickColor(1)" :key="displayedColors[1].name">{{displayedColors[1].name}}</span>
      <span class="button materialName" v-if="displayedDescriptors.material" @click="pickMaterial(1)" :key="displayedMaterials[1].name">{{displayedMaterials[1].name}}</span>
      <span class="button itemName" v-if="displayedDescriptors.item" @click="pickItem(1)" :key="displayedItems[1].name">{{displayedItems[1].name}}</span>
    </div>
    <div v-if="initialized">
      <span class="button is-info rerollRow" @click="rerollRow(2)">➔</span>
      <span class="button qualityName" v-if="displayedDescriptors.quality" @click="pickQuality(2)" :key="displayedQualities[2].name">{{displayedQualities[2].name}}</span>
      <span class="button colorName" v-if="displayedDescriptors.color" @click="pickColor(2)" :key="displayedColors[2].name">{{displayedColors[2].name}}</span>
      <span class="button materialName" v-if="displayedDescriptors.material" @click="pickMaterial(2)" :key="displayedMaterials[2].name">{{displayedMaterials[2].name}}</span>
      <span class="button itemName" v-if="displayedDescriptors.item" @click="pickItem(2)" :key="displayedItems[2].name">{{displayedItems[2].name}}</span>
    </div>
    <div v-if="initialized">
      <span class="button is-info rerollRow" @click="rerollRow(3)">➔</span>
      <span class="button qualityName" v-if="displayedDescriptors.quality" @click="pickQuality(3)" :key="displayedQualities[3].name">{{displayedQualities[3].name}}</span>
      <span class="button colorName" v-if="displayedDescriptors.color" @click="pickColor(3)" :key="displayedColors[3].name">{{displayedColors[3].name}}</span>
      <span class="button materialName" v-if="displayedDescriptors.material" @click="pickMaterial(3)" :key="displayedMaterials[3].name">{{displayedMaterials[3].name}}</span>
      <span class="button itemName" v-if="displayedDescriptors.item" @click="pickItem(3)" :key="displayedItems[3].name">{{displayedItems[3].name}}</span>
    </div>
    <div v-if="initialized">
      <span class="button is-info rerollRow" @click="rerollRow(4)">➔</span>
      <span class="button qualityName" v-if="displayedDescriptors.quality" @click="pickQuality(4)" :key="displayedQualities[4].name">{{displayedQualities[4].name}}</span>
      <span class="button colorName" v-if="displayedDescriptors.color" @click="pickColor(4)" :key="displayedColors[4].name">{{displayedColors[4].name}}</span>
      <span class="button materialName" v-if="displayedDescriptors.material" @click="pickMaterial(4)" :key="displayedMaterials[4].name">{{displayedMaterials[4].name}}</span>
      <span class="button itemName" v-if="displayedDescriptors.item" @click="pickItem(4)" :key="displayedItems[4].name">{{displayedItems[4].name}}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',
  data() {
    return {
      initialized: false,
      items: [],
      displayedDescriptors: {
        item: true,
        color: true,
        quality: true,
        material: false
      },
      params: {
        isArmor: true,
        isClothing: true,
        isContainer: true,
        isFurniture: true,
        isMisc: true,
        isTreasure: true,
        isWeapon: true,
        isWriting: true,
      },
      displayedItems: [
      {name: "0"},
      {name: "1"},
      {name: "2"},
      {name: "3"},
      {name: "4"}
      ],
      displayedColors: [
      {name: "0"},
      {name: "1"},
      {name: "2"},
      {name: "3"},
      {name: "4"}
      ],
      displayedMaterials: [
      {name: "0"},
      {name: "1"},
      {name: "2"},
      {name: "3"},
      {name: "4"}
      ],
      displayedQualities: [
      {name: "0"},
      {name: "1"},
      {name: "2"},
      {name: "3"},
      {name: "4"}
      ]
    };
  },
  async mounted() {
    const response = await axios.get('api/data/', { params: this.params });
    this.items = response.data.items;
    this.colors = response.data.colors;
    this.materials = response.data.materials;
    this.qualities = response.data.qualities;

    this.displayedItems.forEach(element => {
      this.pickItem(element.name);
    });
    this.displayedColors.forEach(element => {
      this.pickColor(element.name);
    });
    this.displayedMaterials.forEach(element => {
      this.pickMaterial(element.name);
    });
    this.displayedQualities.forEach(element => {
      this.pickQuality(element.name);
    });

    this.initialized = true;
  },
  methods: {
    async getData() {
      const response = await axios.get('api/data/', { params: this.params });
      this.items = response.data.items;
      this.colors = response.data.colors;
      this.materials = response.data.materials;
      this.qualities = response.data.qualities;
    },
    async toggleMaterial() {
      this.displayedDescriptors.material = !this.displayedDescriptors.material;
    },
    async toggleColor() {
      this.displayedDescriptors.color = !this.displayedDescriptors.color;
    },
    async toggleQuality() {
      this.displayedDescriptors.quality = !this.displayedDescriptors.quality;
    },
    async toggleItemType(itemType) {
      this.params[itemType] = !this.params[itemType];
      await this.getData();
      this.rerollItems();
    },
    async rerollRow(rowNum) {
      this.pickItem(rowNum);
      this.pickColor(rowNum);
      this.pickMaterial(rowNum);
      this.pickQuality(rowNum);
    },
    async rerollItems() {
      for (let i = 0; i < 5; i++) {
        this.pickItem(i);
      }
    },
    async pickItem(rowNum) {
      this.displayedItems[rowNum] = this.items[Math.floor(Math.random() * this.items.length)]
    },
    async pickColor(rowNum) {
      this.displayedColors[rowNum] = this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    async pickMaterial(rowNum) {
      this.displayedMaterials[rowNum] = this.materials[Math.floor(Math.random() * this.materials.length)]
    },
    async pickQuality(rowNum) {
      this.displayedQualities[rowNum] = this.qualities[Math.floor(Math.random() * this.qualities.length)]
    }
  }
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 760px;
}
</style>
