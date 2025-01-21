<script setup lang="ts">
import type { Launch } from '@/types/launch'
import LaunchItem from '@/components/LaunchItem.vue'

defineProps<{
  launches: Launch[]
}>()

const emit = defineEmits<{
  (e: 'select', launch: Launch): void
}>()
</script>

<template>
  <div class="space-y-4">
    <LaunchItem
        v-for="launch in launches"
        :key="launch.id"
        :launch="launch"
        @click="emit('select', launch)"
    />
  </div>
</template>