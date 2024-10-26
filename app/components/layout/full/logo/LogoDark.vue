<script setup lang="ts">
import {ref} from 'vue';
import {RouterLink} from 'vue-router';

const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
<template>
  <div class="logo">
    <NuxtLink to="/">
      <div style="width: 100%; justify-content: center; text-align: center">
        <img src="/images/logoApp.jpg" alt="logo" style="width: 30%; margin: auto"/>
      </div>
    </NuxtLink>
  </div>
</template>

