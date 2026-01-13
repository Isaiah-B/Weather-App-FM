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
    <Today
      id="weather-today"
      :weather="isLoading ? undefined : weather?.current"
      :location="location"
    />

    <DailyForecast
      id="daily-forecast"
      :data="isLoading ? undefined : weather?.daily"
    />

    <HourlyForecast
      id="hourly-forecast"
      :data="isLoading ? undefined : weather?.hourly"
    />
  </div>
</template>

<style>
  .weather-data-layout {
    width: 100%;
    max-height: 691px;
    display: grid;
    grid-template-columns: 65.8% auto;
    grid-template-rows: 2fr auto;

    column-gap: 2rem;
    row-gap: var(--spacing-48);
  }

  #weather-today {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    display: flex;
    flex-direction: column;
  }

  #daily-forecast {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    align-self: flex-end;

    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #hourly-forecast {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }



  @media(max-width: 58em) {
    .weather-data-layout {
      max-height: none;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr min-content auto;
    }

    #hourly-forecast {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }
  }
</style>