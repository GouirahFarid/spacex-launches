<script setup lang="ts">
import type { Launch } from '@/types/launch'

defineProps<{
  launch: Launch
}>()
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-xl font-semibold">{{ launch.name }}</h3>
        <p class="text-gray-400">
          {{ new Date(launch.date_utc).toLocaleDateString() }}
        </p>
      </div>
      <div
          :class="launch.success ? 'bg-green-600' : 'bg-red-600'"
          class="px-3 py-1 rounded-full"
      >
        {{ launch.success ? 'Success' : 'Failed' }}
      </div>
    </div>
  </div>
</template>