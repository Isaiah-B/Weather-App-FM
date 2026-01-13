<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  
  import Header from './components/Header.vue';
  import Searchbar from './components/Searchbar.vue';
  import Weather from './components/WeatherData/Weather.vue';
  import Error from './components/Error.vue';

  import { AppLocalStorage } from './lib/utils';
  import { type LocationData, type AppUnits, type WeatherData } from './lib/types';
  import { baseParams, fetchWeatherData } from './lib/weatherAPI';
  import { WEATHER_DATA_URL } from './lib/constants';

  AppLocalStorage.InitLocalStorage();
  
  const units = ref(AppLocalStorage.GetLocalStorage('units'));
  const location = ref<LocationData>(AppLocalStorage.GetLocalStorage('location'));

  const params = ref(baseParams);
  const weatherData = ref<WeatherData | undefined>(undefined);
  const dataState = ref<'loading' | 'failed' | 'success'>('loading');

  const onSetUnits = (value: AppUnits) => {
    AppLocalStorage.SetLocalStorage('units', value);
    units.value = value;
  }

  async function fetchData() {
    try {
      dataState.value = 'loading';
      weatherData.value = await fetchWeatherData(WEATHER_DATA_URL, units.value, params.value);
      dataState.value = 'success';
    } catch (err: unknown) {
      dataState.value = 'failed';
    }
  }

  async function changeLoc(newLocation: LocationData) {
    dataState.value = 'loading';
    if (location) {
      location.value = newLocation;
      AppLocalStorage.SetLocalStorage<LocationData>('location', newLocation)
    }
    dataState.value = 'success';
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
      <Searchbar @setLocation="(newLocation) => changeLoc(newLocation)" />
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
    width: calc(1280px / 2);
  }

  #layout-weatherdata {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    margin-top: var(--spacing-48);
  }


  @media (max-width: 58em) {
    #main-header {
      width: 60%;
    }

    #layout-searchbar {
      width: 100%;
    }
  }

  @media (max-width: 33em) {
    #main-header {
      width: 100%;
    }
  }
</style>
