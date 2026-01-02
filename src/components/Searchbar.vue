<script setup lang="ts">
  import { Input } from './ui/input';
  import { Button } from './ui/button';

  import IconSearch from './icons/IconSearch.vue';


</script>

<template>
  <div class="search-bar">
    <div class="input-wrapper">
      <IconSearch />
      <Input placeholder="Search for a palce..." />
    </div>

    <Button>
      Search
    </Button>
  </div>
</template>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 50%;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    
    background-color: var(--color-secondary);
    border-radius: var(--radius-12);
    width: 100%;
    padding: 0.625rem 1.5rem;
  }
  
</style>