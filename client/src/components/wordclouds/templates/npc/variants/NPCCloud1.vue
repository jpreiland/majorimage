<template>
  <div class="world-cloud-container">
    <div ref="cloud" class="word-cloud">
      <div v-for="(item, index) in descriptorConfigs" :key="index" class="descriptor-wrapper" :style="getPositionCss(index)">
        <SimpleDescriptor ref="descriptorRefs" :type="item.type" :proper-noun="true" :color="item.color" @click="checkCollisionsOnReroll" />
      </div>
    </div>

    <button class="button" @click="resetCloud">
      Reroll
    </button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue"

import type { GroupName, CategoryName } from "../../../../../../../shared/types"

interface DescriptorConfig {
  type: GroupName | CategoryName
  color: string | string[]
}

interface Position {
  x: number
  y: number
}

const descriptorConfigs = ref<DescriptorConfig[]>([
  { type: "nameAll", color: "pink" },
  { type: "colorAll", color: ["red", "orange", "yellow", "green", "blue", "violet"] },
  { type: "adjectivePerson", color: "green" },
  { type: "tradeAll", color: "blue" },
  { type: "animal", color: "orange" },
  { type: "structure", color: "red" },
  { type: "itemAll", color: "purple" }
])

const descriptorRefs = ref<any[]>([])
const cloud = ref<HTMLElement>()
const animating = ref(false)

const positions = ref<Position[]>(
  descriptorConfigs.value.map(() => ({
    x: 0,
    y: 0
  }))
)

function getPositionCss(index: number) {
  return {
    left: `${positions.value[index].x}px`,
    top: `${positions.value[index].y}px`
  };
}

function getBoxes() {
  const elements = Array.from(cloud.value!.children) as HTMLElement[]

  return elements.map((el, index) => {
    const rect = el.getBoundingClientRect()

    return {
      index,
      x: positions.value[index].x,
      y: positions.value[index].y,
      width: rect.width,
      height: rect.height
    };
  });
}

function overlaps(a: any, b: any) {
  const padding = 10;

  return !(
    // a is left of b
    a.x + a.width / 2 + padding <
    b.x - b.width / 2 ||

    // a is right of b
    a.x - a.width / 2 - padding >
    b.x + b.width / 2 ||

    // a is above b
    a.y + a.height / 2 + padding <
    b.y - b.height / 2 ||

    // a is below b
    a.y - a.height / 2 - padding >
    b.y + b.height / 2
  );
}

function resolveCollisions() {
  const boxes = getBoxes()

  let moved = false

  for (let i = 1; i < boxes.length; i++) {
    for (let j = 0; j < i; j++) {
      const a = boxes[i]
      const b = boxes[j]

      if (!overlaps(a, b)) continue

      const dx = a.x - b.x
      const dy = a.y - b.y

      let angle

      if (dx === 0 && dy === 0) {
        angle = Math.random() * Math.PI * 2
      } else {
        angle = Math.atan2(dy, dx)
      }

      const overlapX = ((a.width + b.width) / 2) + 10 - Math.abs(dx)
      const overlapY = ((a.height + b.height) / 2) + 10 - Math.abs(dy)

      const push = Math.min(overlapX, overlapY) / 2

      const moveX = Math.cos(angle) * push
      const moveY = Math.sin(angle) * push

      positions.value[i].x += moveX
      positions.value[i].y += moveY

      positions.value[j].x -= moveX
      positions.value[j].y -= moveY

      moved = true
    }
  }

  return moved
}

function handleCollisions() {
  for (let pass = 0; pass < 30; pass++) {
    if (!resolveCollisions()) break
  }
}

async function resetCloud() {
  if (animating.value) return

  animating.value = true

  moveToCenter()
  await wait(300)
  rerollDescriptors()
  await nextTick()
  generateInitialPositions()
  await nextTick()
  handleCollisions()

  animating.value = false
}

function moveToCenter() {
  const rect = cloud.value!.getBoundingClientRect()

  positions.value = descriptorConfigs.value.map(() => ({
    x: rect.width / 2,
    y: rect.height / 2
  }))
}

function wait(ms: number) {
  return new Promise(resolve =>
    setTimeout(resolve, ms)
  );
}

function rerollDescriptors() {
  descriptorRefs.value.forEach(descriptor => {
    descriptor.reroll()
  });
}

function generateInitialPositions() {
  const rect = cloud.value!.getBoundingClientRect()

  positions.value = descriptorConfigs.value.map(() => {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * 120
    
    return {
      x: (rect.width / 2) + (Math.cos(angle) * radius),
      y: (rect.height / 2) + (Math.sin(angle) * radius)
    }
  })
}

async function checkCollisionsOnReroll() {
  await nextTick()
  handleCollisions()
}

onMounted(() => {
  const rect = cloud.value!.getBoundingClientRect()

  positions.value = descriptorConfigs.value.map(() => {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * 80

    return {
      x: (rect.width / 2) + (Math.cos(angle) * radius),
      y: (rect.height / 2) + (Math.sin(angle) * radius)
    }
  })

  setTimeout(() => {
    handleCollisions()
  }, 50)
})

</script>