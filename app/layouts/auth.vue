<script setup lang="ts">

definePageMeta({
  middleware: ['sanctum:guest'],
});

</script>

<template>
  <v-app>
    <slot/>
  </v-app>

</template>

<style scoped>

</style>
