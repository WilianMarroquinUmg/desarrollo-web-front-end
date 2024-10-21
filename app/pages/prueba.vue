<script lang="ts"  setup>
import {defineComponent} from 'vue'
import MiCard from "~/components/personalized/MiCard.vue";
import SelectorDirecciones from "~/components/personalized/SelectorDirecciones.vue";

const prueba = ref(null);


</script>

<template>

  <mi-card>

    <P v-text="prueba"></P>
    <selector-direcciones label="Nombre" v-model="prueba" />

  </mi-card>

</template>

<style scoped>

</style>
