<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  import { Skeleton } from '../ui/skeleton';
  
  import type { LocationData, WeatherData } from '@/lib/types';
  import { AppLocalStorage, formatLocation } from '@/lib/utils';

  const { weather, location } = defineProps<{
    weather: WeatherData['current'] | undefined,
    location: LocationData | undefined,
  }>();

  const initTimezone = AppLocalStorage.GetLocalStorage('location').timezone;
  const date = ref(new Date().toLocaleString([], { timeZone: initTimezone, dateStyle: 'full' } ));
  
  const locationStr = computed(() => formatLocation(location!, location?.country === 'United States'));

  watch(() => location, () => {
    const timezone = location?.timezone;
    date.value = new Date().toLocaleString([], { timeZone: timezone, dateStyle: 'full' });
  });
</script>

<template>
  <section>
      <div v-if="weather" class="today-main-container today-main">
        <div class="today-content">
          <div class="today-content--info">
            <div class="location">
              <h2>{{ locationStr }}</h2>
            </div>
            <p>{{ date }}</p>
          </div>
          <div class="today-content--weather">
            <img :src="`/assets/${weather.icon}`" aria-hidden="true">
            <span>{{ weather.temperature }}°</span>
          </div>
        </div>
      </div>

      <div class="today-skeleton-wrapper" v-else>
        <Skeleton class="today-main-container" />
        <div class="skeleton-loading">
          <span>Loading...</span>
        </div>
      </div>

      <div class="today-data" >
        <div class="weather-data-card">
          <h4>Feels Like</h4>
          <span v-if="weather">{{ weather.apparent_temperature }}°</span>
          <span v-else>-</span>
        </div>
        <div class="weather-data-card">
          <h4>Humidity</h4>
          <span v-if="weather">{{ weather.humidity }}%</span>
          <span v-else>-</span>
        </div>
        <div class="weather-data-card">
          <h4>Wind</h4>
          <span v-if="weather">{{ weather.wind }}</span>
          <span v-else>-</span>
        </div>
        <div class="weather-data-card">
          <h4>Precipitation</h4>
          <span v-if="weather">{{ weather.precipitation }}</span>
          <span v-else>-</span>
        </div>
      </div>
    </section>
</template>

<style>
  #weather-today {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    display: flex;
    flex-direction: column;
  }

  .today-main-container {
    display: flex;
    width: 100%;
    border-radius: 20px;
    flex-grow: 1;

    background-color: var(--color-border);
  }

  .today-main {  
    background-image: url('../../assets/images/bg-today-large.svg');
    background-color: var(--color-card);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .today-skeleton-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .skeleton-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: var(--text-lg);
  }

  .today-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding-top: calc(10.5 * var(--app-spacing));
    padding-bottom: calc(10.5 * var(--app-spacing));
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .today-content--info {
    text-align: start;
  }
  .today-content--info h2 {
    font-size: var(--text-2xl);
    font-weight: 700;
    margin-bottom: 0.75rem;
  }
  .today-content--info p {
    font-size: var(--text-lg);
  }

  .today-content--weather {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;
  }
  .today-content--weather img {
    width: 120px;
  }

  .today-content--weather span {
    font-size: var(--text-5xl);
    line-height: var(--text-5xl--line-height);
    font-weight: 600;
    font-style: italic;
    letter-spacing: -2px;
  }


  .today-data {
    display: grid;
    gap: 1.5rem;
    margin-top: 2rem;
    grid-template-columns: repeat(4, 1fr);
  }

  .today-data .weather-data-card {
    text-align: start;
    padding: 1.25rem;
  }
  .today-data .weather-data-card h4 {
    font-size: var(--text-lg);
    line-height: var(--text-lg--line-height);
    color: var(--color-muted-foreground);
    margin-bottom: 1.5rem;
  }
  .today-data .weather-data-card span {
    font-size: var(--text-3xl);
    line-height: var(--text-3xl--line-height);
    font-weight: 300;
    color: var(--color-card-foreground);
  }

  .location {
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }


  
  @media(max-width: 65em) {
    .today-data {
      gap: 14px;
    }
  }

  @media(max-width: 58em) {
    .today-data {
      margin-top: 1.25rem;
    }
  }

  @media(max-width: 42em) {
    .today-data {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }

  @media(max-width: 33em) {
    .today-content {
      flex-direction: column;
      gap: 16px;
    }

    .today-content--info {
      text-align: center;
    }
  }
</style>