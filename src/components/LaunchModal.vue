<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import type {Launch, Launchpad, Payload} from '@/types/launch'
import {useSpaceX} from '@/composables/useSpaceX'

const props = defineProps<{
  launch: Launch | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const spacex = useSpaceX()
const showVideo = ref(false)
const payloads = ref<Payload[]>([])
const launchpad = ref<Launchpad | null>(null)

const fetchDetails = async () => {
  if (!props.launch) return

  try {
    // Fetch launch details
    launchpad.value = await spacex.getLaunchpadDetails(props.launch.id)

    // Fetch payload details
    const payloadPromises = props.launch.payloads.map(id =>
        spacex.getPayloadDetails(id)
    )
    payloads.value = await Promise.all(payloadPromises)
  } catch (error) {
    console.error('Error fetching details:', error)
  }
}

onMounted(fetchDetails)
</script>

<template>
  <div v-if="launch" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-2xl font-bold">{{ launch.name }}</h2>
        <button
            class="text-gray-400 hover:text-white"
            @click="emit('close')"
        >
          ×
        </button>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <!-- Date and Mission Details -->
        <div>
          <p class="text-lg">
            {{ new Date(launch.date_utc).toLocaleDateString('fr-FR') }}
          </p>
          <p class="text-gray-400 mt-2">{{ launch.details }}</p>
        </div>

        <!-- Mission Patch -->
        <img
            v-if="launch.links.patch.large"
            :alt="launch.name"
            :src="launch.links.patch.large"
            class="max-w-xs mx-auto"
        />

        <!-- Launch Site -->
        <div v-if="launchpad">
          <h3 class="text-lg font-semibold mb-2">Launch Site</h3>
          <p>{{ launchpad.full_name }}</p>
        </div>

        <!-- Payloads -->
        <div v-if="payloads.length">
          <h3 class="text-lg font-semibold mb-2">Payloads</h3>
          <ul class="list-disc pl-5 space-y-2">
            <li v-for="payload in payloads" :key="payload.id">
              {{ payload.name }}
              <ul class="list-none text-gray-400 ml-4">
                <li v-for="customer in payload.customers" :key="customer">
                  {{ customer }}
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div class="space-y-4">
          <a
              v-if="launch.links.article"
              :href="launch.links.article"
              class="text-blue-400 hover:underline block"
              target="_blank"
          >
            Read Article
          </a>

          <!-- Video Section -->
          <div v-if="launch.links.webcast">
            <label class="flex items-center cursor-pointer">
              <input
                  v-model="showVideo"
                  class="form-checkbox h-5 w-5 text-blue-600"
                  type="checkbox"
              >
              <span class="ml-2">Show Mission Video</span>
            </label>

            <div v-if="showVideo" class="mt-4">
              <iframe
                  :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full aspect-video rounded"
                  frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>