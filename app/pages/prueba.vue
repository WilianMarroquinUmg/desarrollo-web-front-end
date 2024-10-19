<script setup lang="ts">

import InputDate from "~/components/personalized/InputDate.vue";

import { ref } from 'vue';

const fecha = ref('2024-10-28');


</script>

<template>

  <p v-text="fecha"></p>

  <InputDate v-model="fecha" />


</template>
