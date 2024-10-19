<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";
import Multiselect from 'vue-multiselect'

import {ref} from 'vue'


const value = ref(null);
const options = ref(['list', 'of', 'options']);


const active = useState('activeItem');
active.value = 'nuevoTraslado';

</script>

<template>

  <mi-card>

    <template #header>

      <h1>Traslado Paja de Agua</h1>

    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div class="flex flex-col space-y-2">

        <label for="Dueño">Dueño Actual:</label>

        <multiselect v-model="value" :options="options"></multiselect>

      </div>

      <div class="flex flex-col space-y-2">

        <label for="Dueño">Dueño Nuevo:</label>

        <multiselect v-model="value" :options="options"></multiselect>

      </div>

      <div class="flex flex-col space-y-2">

        <label for="Dueño">Direccion Actual Paja:</label>

        <multiselect v-model="value" :options="options"></multiselect>

      </div>

      <div class="flex flex-col space-y-2">

        <label for="Dueño">Nueva Dirección Paja:</label>

        <multiselect v-model="value" :options="options"></multiselect>

      </div>

      <div class="flex flex-col space-y-2">

        <label for="Dueño">Tipo Adquisición:</label>

        <multiselect v-model="value" :options="options"></multiselect>

      </div>

      <div class="flex flex-col space-y-2">

        <label for="Dueño">Observaciones:</label>

        <UTextarea />

      </div>

    </div>


  </mi-card>


</template>

<style scoped>

</style>
