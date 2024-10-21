<script setup lang="ts">

import MiCard from "~/components/personalized/MiCard.vue";
</script>

<template>
  <mi-card>
    <UAccordion
        color="blue"
        variant="solid"
        size="sm"
        :items="[{ label: '1. What is Nuxt UI?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '2. Getting Started', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '3. Theming', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '4. Components', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }]"
    />
  </mi-card>
</template>

<style scoped>

</style>
