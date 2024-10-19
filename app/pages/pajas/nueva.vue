<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";
import Multiselect from "vue-multiselect";

const active = useState('activeItem');
active.value = 'PajaNueva';


</script>

<template>

  <mi-card>
    <template #header>
      <h1>Crear nueva paja</h1>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div class="flex flex-col space-y-2">

        <multiselect v-model="value" :options="options"></multiselect>

      </div>
    </div>


  </mi-card>


</template>

<style scoped>

</style>
