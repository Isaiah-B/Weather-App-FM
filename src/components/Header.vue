<script setup lang="ts">
  import { ref } from 'vue';
  
  import IconUnits from './icons/IconUnits.vue';
  import IconDropdown from './icons/IconDropdown.vue';

  import { Button } from './ui/button';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from './ui/dropdown-menu';

  import { AppLocalStorage } from '@/lib/utils';
  import type { AppUnits, AppUnit } from '@/lib/types';

  const emit = defineEmits(['setUnits', 'setAllImperial']);
  const selectedUnits = ref(AppLocalStorage.GetLocalStorage('units'));

  const selected = (unit: keyof AppUnits, value: AppUnit) => {
    return selectedUnits.value[unit] === value
      ? 'selected'
      : '';
  }

  const onSelectUnit = (value: AppUnits) => {
    emit('setUnits', value);
    selectedUnits.value = value;
  }

  const swapUnit = () => {
    let unit: AppUnit = anyNotImperial() 
      ? "imperial"
      : "si"
    
    const newUnitsValue: AppUnits = {
      temperature: unit,
      speed: unit,
      precipitation: unit
    };

    emit('setUnits', newUnitsValue);
    selectedUnits.value = newUnitsValue;
  }

  const anyNotImperial = () => {
    return Object.values(selectedUnits.value).some(val => val === 'si');
  }
</script>

<template>
  <header>
    <img src="../assets/images/logo.svg">

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" size="sm" class="icon-btn">
          <IconUnits />
          Units
          <IconDropdown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" class="units-dropdown">
        <DropdownMenuItem
          @select.prevent="swapUnit"
          class="dropdown-item"
        >
          {{ anyNotImperial() ? "Switch to Imperial" : "Switch to Metric" }}
        </DropdownMenuItem>

        <DropdownMenuLabel>Temperature</DropdownMenuLabel>
        <DropdownMenuGroup class="unit-group">
          <DropdownMenuItem
            @select.prevent="onSelectUnit({ ...selectedUnits, temperature: 'si' })"
            :class="`${selected('temperature', 'si')} dropdown-item`"
          >
            <span class="dropdown-item-text">Celsius (°C)</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @select.prevent="onSelectUnit({ ...selectedUnits, temperature: 'imperial' })"
            :class="`${selected('temperature', 'imperial')} dropdown-item`"
          >
            <span class="dropdown-item-text">Fahrenheit (°F)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup class="unit-group">
          <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
            <DropdownMenuItem
              @select.prevent="onSelectUnit({ ...selectedUnits, speed: 'si' })"
              :class="`${selected('speed', 'si')} dropdown-item`"
            >
              <span class="dropdown-item-text">km/h</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              @select.prevent="onSelectUnit({ ...selectedUnits, speed: 'imperial' })"
              :class="`${selected('speed', 'imperial')} dropdown-item`"
            >
              <span class="dropdown-item-text">mph</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup class="unit-group">
          <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
            <DropdownMenuItem
              @select.prevent="onSelectUnit({ ...selectedUnits, precipitation: 'si' })"
              :class="`${selected('precipitation', 'si')} dropdown-item`"
            >
              <span class="dropdown-item-text">Millimeters (mm)</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              @select.prevent="onSelectUnit({ ...selectedUnits, precipitation: 'imperial' })"
              :class="`${selected('precipitation', 'imperial')} dropdown-item`"
            >
              <span class="dropdown-item-text">Inches (in)</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

  </header>
</template>

<style scoped>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
  }

  .unit-group {
    margin-bottom: 9px;
  }
  .unit-group .dropdown-item:not(.dropdown-item:last-child) {
    margin-bottom: 4px;
  }

  .units-dropdown .dropdown-item {
    width: var(--dropdown-width);
  }

  .dropdown-item-text {
    position: relative;
    width: 100%;
  }
  .dropdown-item.selected .dropdown-item-text::after {
    position: absolute;
    content: url(../assets/images/icon-checkmark.svg);

    top: 50%;
    right: 0%;
    transform: translateY(-50%);
  }
</style>