<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  import { Skeleton } from '../ui/skeleton';

  import type { WeatherData } from '@/lib/types';
  import { AppLocalStorage, GetIconFromWeatherCode } from '@/lib/utils';

  const { data } = defineProps<{ data: WeatherData['daily'] | undefined }>();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = ref(
    new Date(
      (new Date()).toLocaleString([], {
        timeZone: AppLocalStorage.GetLocalStorage('location').timezone
      })
    )
  );
  
  watch(() => data, () => {
    currentDate.value = new Date((new Date()).toLocaleString([], { timeZone: data?.timezone }));
  })

  const forecastData = computed(() => {
    let arr = [];

    for (let i = 0; i < 7; i++) {
      const dayNum = (currentDate.value.getDay() + i) % 7;
      const day = dayNames[dayNum];
      
      arr.push({
        day,
        code: data?.weather_codes[i],
        temp_max: data?.temperature_max[i],
        temp_min: data?.temperature_min[i]
      })
    }
  
    return arr;
  });
</script>

<template>
  <section>
    <h3 class="daily-forecast-header">Daily forecast</h3>
    
    <div class="forecast-list">
        <div v-for="day in forecastData" v-if="forecastData[0]?.code" class="weather-data-card">
          <h4>{{ day.day }}</h4>
          <img :src="`/assets/${GetIconFromWeatherCode(day.code || 0)}`" alt="sunny">
          <div class="forecast-temps">
            <span>{{ day.temp_max }}°</span>
            <span>{{ day.temp_min }}°</span>
          </div>
        </div>

        <Skeleton v-else
          v-for="day in forecastData"
          class="weather-data-card data-card-skeleton"
        />
    </div>
  </section>
</template>

<style>
  .daily-forecast-header {
    text-align: start;
    margin-bottom: 1.25rem;
  }

  .forecast-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
    flex-grow: 1;
  }

  .forecast-list .weather-data-card {
    padding: 16px 10px;
  }

  .forecast-temps {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .forecast-temps span {
    font-size: var(--text-base);
    line-height: var(--text-base--line-height);
  }


  @media (max-width: 42em) {
    .forecast-list {
      display: flex;
      flex-wrap: wrap;
    }

    .forecast-list .weather-data-card {
      width: 100px;
      height: 165px;
    }
  }
</style>