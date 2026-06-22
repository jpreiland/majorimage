<template>
  <div class="world-cloud-container">
    <div ref="cloud" class="word-cloud">
      <div
        v-for="(item, index) in props.items"
        :key="item.id"
        :ref="el => descriptorWrappers[index] = el as HTMLElement"
        class="descriptor-wrapper"
        :style="getPositionCss(index)"
      >
        <component
          :is="getComponent(item)"
          :ref="el => descriptorRefs[index] = el"
          v-bind="getProps(item)"
          @click="checkCollisionsOnReroll"
        />
      </div>
    </div>

    <button class="button" @click="resetCloud">
      Reroll
    </button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import Descriptor from '../../descriptors/Descriptor.vue'
import SimpleDescriptor from '../../descriptors/SimpleDescriptor.vue'

import type { WordCloudItem } from './word-cloud.ts'

interface Props {
  items: WordCloudItem[]
}

interface Position {
  x: number
  y: number
}

const props = defineProps<Props>()

const descriptorRefs = ref<any[]>([])
const descriptorWrappers = ref<HTMLElement[]>([])
const cloud = ref<HTMLElement>()
const animating = ref(false)

const positions = ref<Position[]>(
  props.items.map(() => ({
    x: 0,
    y: 0
  }))
)

onMounted(() => {
  generateInitialPositions()

  setTimeout(() => {
    handleCollisions()
  }, 50)
})

function getComponent(item: WordCloudItem) {
  return item.component === "simple" ? SimpleDescriptor : Descriptor
}

function getProps(item: WordCloudItem) {
  const { id, component, ...props } = item
  return props
}

function getPositionCss(index: number) {
  return {
    left: `${positions.value[index].x}px`,
    top: `${positions.value[index].y}px`
  };
}

function getBoxes() {
  return descriptorWrappers.value.map((el, index) => {
    const rect = el.getBoundingClientRect()

    return {
      index,
      x: positions.value[index].x,
      y: positions.value[index].y,
      width: rect.width,
      height: rect.height
    }
  })
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

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
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

      clampPosition(a.index, a.width, a.height)
      clampPosition(b.index, b.width, b.height)

      moved = true
    }
  }

  return moved
}

function clampPosition(index: number, width: number, height: number) {
  const cloudRect = cloud.value!.getBoundingClientRect()

  const padding = 10

  const minX = width / 2 + padding
  const maxX = cloudRect.width - width / 2 - padding

  const minY = height / 2 + padding
  const maxY = cloudRect.height - height / 2 - padding

  positions.value[index].x =
    Math.max(minX, Math.min(maxX, positions.value[index].x))

  positions.value[index].y =
    Math.max(minY, Math.min(maxY, positions.value[index].y))
}

function keepInBounds(box: any) {
  const cloudRect = cloud.value!.getBoundingClientRect()

  const padding = 10

  let moved = false

  const minX = box.width / 2 + padding
  const maxX = cloudRect.width - box.width / 2 - padding

  const minY = box.height / 2 + padding
  const maxY = cloudRect.height - box.height / 2 - padding

  if (box.x < minX) {
    positions.value[box.index].x += minX - box.x
    moved = true
  }

  if (box.x > maxX) {
    positions.value[box.index].x -= box.x - maxX
    moved = true
  }

  if (box.y < minY) {
    positions.value[box.index].y += minY - box.y
    moved = true
  }

  if (box.y > maxY) {
    positions.value[box.index].y -= box.y - maxY
    moved = true
  }

  return moved
}

function handleCollisions() {
  for (let pass = 0; pass < 100; pass++) {
    let moved = false

    if (resolveCollisions()) {
      moved = true
    }

    const boxes = getBoxes()

    for (const box of boxes) {
      if (keepInBounds(box)) {
        moved = true
      }
    }

    if (!moved) break
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

  positions.value = props.items.map(() => ({
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
    descriptor?.reroll()
  })
}

async function checkCollisionsOnReroll() {
  await nextTick()
  handleCollisions()
}

function generateInitialPositions() {
  const rect = cloud.value!.getBoundingClientRect()
  const boxes = getBoxes().sort((a, b) => b.width - a.width)
  const newPositions = [...positions.value]

  for (const box of boxes) {
    const angle = Math.random() * Math.PI * 2
    const radius =  Math.random() * Math.min(rect.width, rect.height) / 4

    newPositions[box.index] = {
      x: (rect.width / 2) + (Math.cos(angle) * radius),
      y: (rect.height / 2) + (Math.sin(angle) * radius)
    }
  }

  positions.value = newPositions
}

</script>