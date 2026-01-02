<script setup lang="ts">
  import { ref } from 'vue';
  import Header from './components/Header.vue';
  import Searchbar from './components/Searchbar.vue';
  import WeatherData from './components/WeatherData/WeatherData.vue';

  import { AppLocalStorage } from './lib/utils';
  import type { AppUnits } from './lib/types';

  AppLocalStorage.InitLocalStorage();
  
  const currentUnits = ref(AppLocalStorage.GetLocalStorage());

  const onSetUnits = (value: AppUnits) => {
    AppLocalStorage.SetLocalStorage(value);
    currentUnits.value = value;
  }
</script>

<template>
  <Header
    @setUnits="(value: AppUnits) => onSetUnits(value)"
  />

  <main>
    <h1 id="main-header">How's the sky looking today?</h1>
    
    <div id="layout-searchbar">
      <Searchbar />
    </div>

    <div id="layout-weatherdata">
      <WeatherData :units="currentUnits"/>
    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    width: 100%;
    margin-top: var(--spacing-48);
  }
</style>
