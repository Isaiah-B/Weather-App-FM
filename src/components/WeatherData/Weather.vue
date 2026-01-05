<script setup lang="ts">
  import Today from './Today.vue';
  import DailyForecast from './DailyForecast.vue';
  import HourlyForecast from './HourlyForecast.vue';
  
  import type { WeatherData } from '@/lib/types';

  const { data } = defineProps<{ data: WeatherData | undefined }>()

</script>

<template>
  <div class="weather-data-layout">
    <Today :data="data?.current"/>

    <DailyForecast :data="data?.daily" />

    <HourlyForecast :data="data?.hourly" />
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