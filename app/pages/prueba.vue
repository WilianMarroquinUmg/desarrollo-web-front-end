<script lang="ts"  setup>
import {defineComponent} from 'vue'
import SelectDirecciones from "~/components/personalized/SelectorDirecciones.vue";
import MiCard from "~/components/personalized/MiCard.vue";

const prueba = ref(null);

</script>

<template>

  <mi-card>

    <personalized-selector-direcciones v-model="prueba" label="nombre" />


  </mi-card>

</template>

<style scoped>

</style>
