<script setup lang="ts">
  import { computed } from 'vue';
  
  import Today from './Today.vue';
  import DailyForecast from './DailyForecast.vue';
  import HourlyForecast from './HourlyForecast.vue';
  
  import type { LocationData, WeatherData } from '@/lib/types';

  const { weather, location, state } = defineProps<{
    weather: WeatherData | undefined,
    location: LocationData | undefined,
    state: 'loading' | 'success' | 'failed'
  }>()

  const isLoading = computed(() => state === 'loading');
</script>

<template>
  <div class="weather-data-layout">
    <Today :weather="isLoading ? undefined : weather?.current" :location="location"/>

    <DailyForecast :data="isLoading ? undefined : weather?.daily" />

    <HourlyForecast :data="isLoading ? undefined : weather?.hourly" />
  </div>
</template>

<style>
  .weather-data-layout {
    width: 100%;
    max-height: 691px;
    display: grid;
    grid-template-columns: 65.8% auto;
    grid-template-rows: 2fr 1fr;

    column-gap: 2rem;
    row-gap: var(--spacing-48);
  }
</style>