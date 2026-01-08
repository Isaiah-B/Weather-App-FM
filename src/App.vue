<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  
  import Header from './components/Header.vue';
  import Searchbar from './components/Searchbar.vue';
  import Weather from './components/WeatherData/Weather.vue';
  import Error from './components/Error.vue';

  import { AppLocalStorage } from './lib/utils';
  import type { AppUnits, WeatherData } from './lib/types';
  import { baseParams, fetchWeatherData } from './lib/weatherAPI';
  import { Location } from './lib/locationAPI';

  AppLocalStorage.InitLocalStorage();
  
  const units = ref(AppLocalStorage.GetLocalStorage('units'));

  const onSetUnits = (value: AppUnits) => {
    AppLocalStorage.SetLocalStorage('units', value);
    units.value = value;
  }

  const location = ref(AppLocalStorage.GetLocalStorage('location'));

  const url = "https://api.open-meteo.com/v1/forecast";
  const params = ref(baseParams);

  const weatherData = ref<WeatherData | undefined>(undefined);
  const dataState = ref<'loading' | 'failed' | 'success'>('loading');

  async function fetchData() {
    try {
      dataState.value = 'loading';
      weatherData.value = await fetchWeatherData(url, units.value, params.value);
      dataState.value = 'success';
    } catch (err: unknown) {
      dataState.value = 'failed';
    }
  }

  async function changeLoc(locationName: string) {
    try {
      dataState.value = 'loading';
      location.value = await Location().Search(locationName);
      dataState.value = 'success';
    } catch (err: unknown) {
      dataState.value = 'failed';
    }
  }

  watchEffect(async () => {
    params.value = {
      ...baseParams,
      
      latitude: location.value.latitude,
      longitude: location.value.longitude,
      timezone: location.value.timezone || "auto",

      ...units.value.temperature === "imperial" && { temperature_unit: "fahrenheit" },
      ...units.value.speed === "imperial" && { wind_speed_unit: "mph" },
      ...units.value.precipitation === "imperial" && { precipitation_unit: "inch" },
    }
    
    await fetchData();
  });

</script>
  
<template>
  <Header
    @setUnits="(value: AppUnits) => onSetUnits(value)"
  />

  <Error v-if="dataState === 'failed'"
    @onRetry="async () => fetchData()"
  />

  <main v-else>
    <h1 id="main-header">How's the sky looking today?</h1>
    
    <div id="layout-searchbar">
      <Searchbar @setLocation="(location) => changeLoc(location)"/>
    </div>

    <div id="layout-weatherdata">
      <Weather :weather="weatherData" :location="location" :state="dataState"/>
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
