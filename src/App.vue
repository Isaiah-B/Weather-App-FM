<script setup lang="ts">
  import { ref, watch, watchEffect } from 'vue';
  
  import Header from './components/Header.vue';
  import Searchbar from './components/Searchbar.vue';
  import Weather from './components/WeatherData/Weather.vue';

  import { AppLocalStorage } from './lib/utils';
  import type { AppUnits, WeatherData } from './lib/types';
  import { baseParams, fetchWeatherData } from './lib/weatherAPI';
  import Error from './components/Error.vue';

  AppLocalStorage.InitLocalStorage();
  
  const units = ref(AppLocalStorage.GetLocalStorage());

  const onSetUnits = (value: AppUnits) => {
    AppLocalStorage.SetLocalStorage(value);
    units.value = value;
  }

  const url = "https://api.open-meteo.com/v1/forecast";
  const params = ref(baseParams);
  const weatherData = ref<WeatherData | undefined>(undefined);
  const dataState = ref<'loading' | 'failed' | 'success'>('loading');
    
  async function fetchData() {
    try {
      weatherData.value = await fetchWeatherData(url, units.value, params.value);
      dataState.value = 'success';
    } catch (err: unknown) {
      dataState.value = 'failed';
    }
  }

  watchEffect(async () => {
    params.value = {
      ...baseParams,
      ...units.value.temperature === "imperial" && { temperature_unit: "fahrenheit" },
      ...units.value.speed === "imperial" && { wind_speed_unit: "mph" },
      ...units.value.precipitation === "imperial" && { precipitation_unit: "inch" },
    }
    
    await fetchData();
  });

  watch(() => units, async () => {
    await fetchData();
  });
</script>
  
<template>
  <Header
    @setUnits="(value: AppUnits) => onSetUnits(value)"
  />

  <Error v-if="dataState === 'failed'" />

  <main v-else>
    <h1 id="main-header">How's the sky looking today?</h1>
    
    <div id="layout-searchbar">
      <Searchbar />
    </div>

    <div id="layout-weatherdata">
      <Weather :data="weatherData"/>
    </div>
  </main>
</template>


<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    width: 100%;
    margin-top: var(--spacing-64);
    text-align: center;
  }

  #main-header {
    font-family: 'Bricolage Grotesque';
    margin-bottom: var(--spacing-64);
  }

  #layout-searchbar {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  #layout-weatherdata {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    margin-top: var(--spacing-48);
  }
</style>
