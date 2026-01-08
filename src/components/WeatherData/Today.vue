<script setup lang="ts">
  import { computed } from 'vue';
  import { Skeleton } from '../ui/skeleton';
  
  import type { LocationData, WeatherData } from '@/lib/types';

  const { weather, location } = defineProps<{
    weather: WeatherData['current'] | undefined,
    location: LocationData | undefined,
  }>();

  const locationStr = computed(() => [location?.name, location?.country].filter(l => l).join(', '));
</script>

<template>
  <section id="weather-today">
      <div v-if="weather" class="today-main-container today-main">
        <div class="today-content">
          <div class="today-content--info">
            <div class="location">
              <h2>{{ locationStr }}</h2>
            </div>
            <p>Tuesday, Aug 5, 2025</p>
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
  }
  .today-content--weather img {
    width: 120px;
    height: 120px;
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

  }
  .location h2 {
  }
</style>