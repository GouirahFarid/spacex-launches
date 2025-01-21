# src/App.vue
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useSpaceX } from '@/composables/useSpaceX'
import type { Launch, LaunchFilter } from '@/types/launch'
import LaunchList from '@/components/LaunchList.vue'
import LaunchModal from '@/components/LaunchModal.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const spacex = useSpaceX()
const nextLaunch = ref<Launch | null>(null)
const launches = ref<Launch[]>([])
const selectedFilter = ref<LaunchFilter>('all')
const countdown = ref('')
const selectedLaunch = ref<Launch | null>(null)
const showModal = ref(false)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Watch pour le changement de filtre
watch(selectedFilter, async (newFilter) => {
  isLoading.value = true
  try {
    launches.value = await spacex.getLatestLaunches(newFilter)
  } catch (err) {
    error.value = 'Erreur lors du chargement des lancements. Veuillez réessayer.'
    console.error('Erreur lors de la récupération des lancements:', err)
  } finally {
    isLoading.value = false
  }
})

const updateCountdown = () => {
  if (!nextLaunch.value) return

  const launchDate = new Date(nextLaunch.value.date_utc)
  const now = new Date()
  const diff = launchDate.getTime() - now.getTime()

  if (diff <= 0) {
    countdown.value = "Lancement déjà effectué"
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
}

const fetchData = async () => {
  isLoading.value = true
  error.value = null
  try {
    const [nextLaunchData, launchesData] = await Promise.all([
      spacex.getNextLaunch(),
      spacex.getLatestLaunches(selectedFilter.value)
    ])
    nextLaunch.value = nextLaunchData
    launches.value = launchesData
  } catch (err) {
    error.value = 'Erreur lors du chargement des lancements. Veuillez réessayer.'
    console.error('Erreur lors de la récupération des lancements:', err)
  } finally {
    isLoading.value = false
  }
}

const openLaunchModal = (launch: Launch) => {
  selectedLaunch.value = launch
  showModal.value = true
}

onMounted(async () => {
  await fetchData()
  setInterval(updateCountdown, 1000)
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="space-y-8">
      <h1 class="text-4xl font-bold text-center">SpaceX Launches</h1>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-500 text-white p-4 rounded-lg">
        {{ error }}
        <button
            class="ml-4 underline hover:no-underline"
            @click="fetchData"
        >
          Réessayer
        </button>
      </div>

      <LoadingSpinner v-if="isLoading"/>

      <!-- Next Launch Section -->
      <div v-if="nextLaunch" class="bg-gray-800 rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Prochain Lancement</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-xl">{{ nextLaunch.name }}</p>
            <p class="text-gray-400">
              {{ new Date(nextLaunch.date_utc).toLocaleDateString() }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-xl font-mono">{{ countdown }}</p>
          </div>
        </div>
      </div>

      <!-- Launch Filter -->
      <select
          v-model="selectedFilter"
          class="bg-gray-800 text-white rounded px-4 py-2 w-full max-w-xs"
      >
        <option value="all">Tous les lancements</option>
        <option value="success">Lancements réussis</option>
        <option value="failed">Lancements échoués</option>
      </select>

      <!-- Launch List -->
      <LaunchList
          :launches="launches"
          @select="openLaunchModal"
      />

      <!-- Launch Modal -->
      <LaunchModal
          v-if="showModal"
          :launch="selectedLaunch"
          @close="showModal = false"
      />
    </div>
  </div>
</template>