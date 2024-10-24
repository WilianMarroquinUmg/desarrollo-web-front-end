<script setup lang="ts">


import Esperar from "~/components/personalized/esperar.vue";

import { ref } from 'vue';


const modalVisible = ref(false);

</script>

<template>

  <esperar :is-visible="false" />

  <UButton @click="modalVisible = !modalVisible">Abrir modal</UButton>

</template>

