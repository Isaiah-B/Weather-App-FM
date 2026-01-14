<script setup lang="ts">
  import { computed, ref } from 'vue';
  
  import { Input } from './ui/input';
  import { Button } from './ui/button';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from './ui/dropdown-menu';

  import IconSearch from './icons/IconSearch.vue';

  import { Location } from '@/lib/locationAPI';
  import type { LocationData } from '@/lib/types';
  import { formatLocation } from '@/lib/utils';

  const emit = defineEmits(['setLocation']);

  const inputValue = ref<string>('');

  const searchState = ref<'loading' | 'success' | 'failed'>('loading');
  const searchResults = ref<LocationData[]>([]);
  const dropdownOpen = ref(false);

  const search = async (value: string) =>  {
    try {
      dropdownOpen.value = true;
      searchState.value = 'loading';
      searchResults.value = await Location().Search(value);
      searchState.value = 'success';
    } catch {
      searchState.value = 'failed';
    }
  }

</script>

<template>
  <div class="search-bar">
    <DropdownMenu :open="dropdownOpen">
      <label for="searchbar-input" class="input-wrapper">
        <DropdownMenuTrigger as-child class="dropdown-trigger-ref">
          <div></div>
        </DropdownMenuTrigger>

        <IconSearch />
        <Input
          id="searchbar-input"
          class="search-input"
          placeholder="Search for a palce..."
          v-model.trim="inputValue"
        />
      </label>

      <DropdownMenuContent
        class="search-dropdown"
        :side-offset="10"
        @pointer-down-outside="() => { dropdownOpen = false; searchResults = []; } "
      >      
      <DropdownMenuItem v-if="searchState === 'loading'">
        Search in progress
      </DropdownMenuItem>

      <div v-else-if="searchState === 'failed' && searchResults.length < 1">
        No results found
      </div>
      
        <DropdownMenuItem v-else
          class="dropdown-item search-dropdown-item"
          v-for="result in searchResults"
          @click="$emit('setLocation', result)"
        >
          {{ formatLocation(result, result.country==='United States') }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      class="search-btn"
      @click="async () => { await search(inputValue) }"
    >
      Search
    </Button>
  </div>
</template>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    
    background-color: var(--color-secondary);
    border-radius: var(--radius-12);
    width: 100%;
    padding: 0.625rem 1.5rem;
    
    cursor: pointer;
    transition: background 0.3s;
  }
  .input-wrapper:hover {
    background-color: var(--color-primary);
  }

  .search-input {
    width: 100%;
    cursor: pointer;
    box-shadow: none;
  }

  .search-btn {
    border-radius: 12px;
  }

  .dropdown-trigger-ref {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  .dropdown-trigger-ref div {
    width: 100%;
  }
  
  .search-dropdown {
    width: var(--reka-dropdown-menu-trigger-width);
  }
  
  .search-dropdown-item {
    width: 100%;
  }
  .search-dropdown-item:not(.search-dropdown-item:last-of-type) {
    margin-bottom: 4px;
  }



  @media (max-width: 33em) {
    .search-bar {
      flex-direction: column;
      gap: 12px;
    }

    .search-btn {
      width: 100%;
      height: auto;
      padding: 1rem;
    }
  }
</style>