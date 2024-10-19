<script setup lang="ts">


import MiCard from "~/components/personalized/MiCard.vue";

const active = useState('activeItem');
active.value = 'nuevoTraslado';

</script>

<template>

  <mi-card>

    <template #header>

      <h1>Traslado</h1>

    </template>

  </mi-card>


</template>

<style scoped>

</style>
