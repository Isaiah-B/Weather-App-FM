<script setup lang="ts">
  import Button from './ui/button/Button.vue';

  import IconError from './icons/IconError.vue';
  import IconRetry from './icons/IconRetry.vue';

  const emit = defineEmits(['onRetry']);
</script>

<template>
  <div id="error-container">
    <IconError id="error-icon" />
    <h1 id="error-header">Something went wrong</h1>
    <p id="error-message">We couldn't connect to the server (API error). Please try again in a few moments.</p>

    <Button
      variant="secondary" size="sm"
      id="error-btn" class="icon-btn"
      @click="$emit('onRetry')"
    >
      <IconRetry />
      Retry
    </Button>
  </div>
</template>

<style>
  #error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: var(--spacing-64) auto 0 auto;
    padding: 40px;
    text-align: center;
  }

  #error-icon {
    width: 42px;
    height: 50px;
    margin-bottom: 24px;
  }

  #error-header {
    font-family: 'Bricolage Grotesque';
    margin-bottom: 24px;
  }

  #error-message {
    font-size: var(--text-xl);
    line-height: var(--text-xl--line-height);
    width: 70%;
  }

  #error-btn {
    margin-top: 24px;
  }
</style>