<script setup lang="ts">

definePageMeta({
  middleware: ['sanctum:guest'],
});

</script>

<template>
  <v-app>

    <h1>Layaut para loguearse</h1>

    <slot/>
  </v-app>

</template>

<style scoped>

</style>
