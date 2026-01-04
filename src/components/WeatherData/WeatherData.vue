<script setup lang="ts">
  import { ref, watch, watchEffect } from 'vue';

  import Today from './Today.vue';
  import DailyForecast from './DailyForecast.vue';
  import HourlyForecast from './HourlyForecast.vue';
  
  import type { AppUnits, WeatherData } from '@/lib/types';
  import { fetchWeatherData } from '@/lib/weatherAPI';

  const { units } = defineProps<{ units: AppUnits }>();

  const url = "https://api.open-meteo.com/v1/forecast";
  const weatherData = ref<WeatherData | null>(null);

  const baseParams = {
    latitude: 30.3674,
    longitude: -89.0928,
    timezone: "auto",
    hourly: ["temperature_2m", "weather_code"],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    current: ["temperature_2m", "apparent_temperature", "relative_humidity_2m", "is_day", "precipitation", "wind_speed_10m", "weather_code"],
  }

  const params = ref(baseParams);

  watchEffect(async () => {
    params.value = {
      ...baseParams,
      ...units.temperature === "imperial" && { temperature_unit: "fahrenheit" },
      ...units.speed === "imperial" && { wind_speed_unit: "mph" },
      ...units.precipitation === "imperial" && { precipitation_unit: "inch" },
    }
    
    weatherData.value = await fetchWeatherData(url, units, params.value);
  });

  watch(() => units, async () => {
    weatherData.value = await fetchWeatherData(url, units, params.value);
  });

</script>

<template>
  <div class="weather-data-layout">
    <Today :data="weatherData?.current"/>

    <DailyForecast :data="weatherData?.daily" />

    <HourlyForecast :data="weatherData?.hourly" />
  </div>
</template>

<style>
  .weather-data-layout {
    width: 100%;
    max-height: 712px;
    display: grid;
    grid-template-columns: 65.8% auto;
    grid-template-rows: 2fr 1fr;

    column-gap: 2rem;
    row-gap: var(--spacing-48);
  }
</style>