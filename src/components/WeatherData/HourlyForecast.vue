<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  
  import Button from '../ui/button/Button.vue';
  import { Skeleton } from '../ui/skeleton';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
  
  import IconDropdown from '../icons/IconDropdown.vue';

  import { HOURLY_DATA_LENGTH } from '@/lib/constants';
  import { AppLocalStorage, GetIconFromWeatherCode } from '@/lib/utils';
  import type { WeatherData } from '@/lib/types';

  const { data } = defineProps<{ data: WeatherData['hourly'] | undefined }>();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Date in the current location's timezone
  const locationDate = ref(new Date((new Date()).toLocaleString([], { timeZone: AppLocalStorage.GetLocalStorage('location').timezone })));
  const selectedDay = ref(locationDate.value.getDay()-1);

  watch(() => data, () => {
    locationDate.value = new Date((new Date()).toLocaleString([], { timeZone: data?.timezone }))
    selectedDay.value = locationDate.value.getDay()-1;
  })
  
  // Get 8-hour window of time for the selected day
  // starting at the current hour
  const hourlyData = computed(() => {
    const prevDayOffset = 6;  // Skip 6 hours from the previous day
    const currentDayOffset = ((7 + selectedDay.value) - (locationDate.value.getDay()-1)) % 7;  // Distance between current and selected day
    const selectedDayOffset = prevDayOffset + currentDayOffset * 24;

    const currHour = locationDate.value.getHours();
    let startHour = selectedDayOffset + currHour;

    if (startHour > data?.time.length!) {
      startHour = selectedDayOffset;
    }
    
    let arr = [];
    for (let i = 0; i < HOURLY_DATA_LENGTH; i++) {
      const hour = startHour + i;
      arr.push({
        time: data?.time[hour]!.toLocaleString('en-US', { hour: 'numeric', hour12: true }),
        code: data?.weather_codes[hour-(prevDayOffset-1)],
        temp: data?.temperature[hour-(prevDayOffset-1)],
      });
    }

    return arr;
  });
</script>

<template>
  <section id="hourly-forecast">
    <div class="weather-data-card hourly-data-card">
      <div class="hourly-forecast-header">
        <h3>Hourly forecast</h3>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button :disabled="!data" variant="light" size="sm">
              <span v-if="data">{{ days.at(selectedDay) }}</span>
              <span v-else>-</span>
              <IconDropdown :style="{width: '12px', marginLeft: '5px'}"/>
            </Button>

            <DropdownMenuContent align="end" class="days-dropdown">
              <DropdownMenuItem
                v-for="day, i in days"
                class="dropdown-item"
                @select="() => selectedDay = i"
              >
                {{ day }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>

      <div class="hourly-forecast-list">
        <div v-for="value in hourlyData" v-if="data" class="hourly-data-item">
          <div class="hourly-data-item--left">
            <img :src="`/assets/${GetIconFromWeatherCode(value.code || 0)}`" aria-hidden="true">
            <span>{{ value.time }}</span>
          </div>
          <span class="hourly-data-item--temp">{{ value.temp }}°</span>
        </div>

        <Skeleton v-else
          v-for="value in hourlyData"
          class="hourly-data-item data-card-skeleton"
        />
      </div>
    </div>
  </section>
</template>

<style>
  #hourly-forecast {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }

  .days-dropdown .dropdown-item {
    width: var(--dropdown-width);
  }

  .hourly-data-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    height: 100%;
  }

  .hourly-forecast-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hourly-forecast-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
  }

  .hourly-data-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;

    width: 100%;
    padding: var(--spacing-10);
    padding-right: 16px;
    
    border-radius: 8px;
    background-color: var(--color-primary);
  }

  .hourly-data-item--left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hourly-data-item--left img {
    width: 40px;
    height: 40px;
  }
  .hourly-data-item--left span {
    font-size: var(--text-xl);
    line-height: var(--text-xl--line-height);
  }
  
  .hourly-data-item--temp {
    font-size: var(--text-base);
    line-height: var(--text-base--line-height);
  }
</style>