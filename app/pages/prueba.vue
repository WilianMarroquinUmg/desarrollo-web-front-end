<template>
  <div>

    <p>Fecha seleccionada: {{ selectedDate }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputDate from '~/components/personalized/InputDate.vue';

const selectedDate = ref<string | null>(null);



</script>
