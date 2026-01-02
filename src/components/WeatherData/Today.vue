<script setup lang="ts">
  import type { WeatherData } from '@/lib/types';

  const { data } = defineProps<{ data: WeatherData['current'] | undefined }>();
</script>

<template>
  <section v-if="data" id="weather-today">
      <div class="today-main">
        <div class="today-content">
          <div class="today-content--info">
            <h2>Berlin, Germany</h2>
            <p>Tuesday, Aug 5, 2025</p>
          </div>
          <div class="today-content--weather">
            <img :src="`/assets/${data.icon}`" aria-hidden="true">
            <span>{{ data.temperature }}°</span>
          </div>
        </div>
      </div>

      <div class="today-data" >
        <div class="weather-data-card">
          <h4>Feels Like</h4>
          <span>{{ data.apparent_temperature }}°</span>
        </div>
        <div class="weather-data-card">
          <h4>Humidity</h4>
          <span>{{ data.humidity }}%</span>
        </div>
        <div class="weather-data-card">
          <h4>Wind</h4>
          <span>{{ data.wind }}</span>
        </div>
        <div class="weather-data-card">
          <h4>Precipitation</h4>
          <span>{{ data.precipitation }}</span>
        </div>
      </div>
    </section>

  <div v-else>
    No data here
  </div>
</template>

<style>
  #weather-today {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    display: flex;
    flex-direction: column;
  }

  .today-main {
    width: 100%;
    border-radius: 20px;
    flex-grow: 1;
    
    background-image: url('../../assets/images/bg-today-large.svg');
    background-color: var(--color-card);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
</style>