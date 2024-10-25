<script setup lang="ts">

import MiCard from "~/components/personalized/MiCard.vue";

definePageMeta({
    title: 'Dashboard',
    layout: 'default',
});

const active = useState('activeItem');
active.value = 'home';

const user = useSanctumUser()

</script>
<template>

  <mi-card>
    <template #header>
      <h1 class="text-2xl font-bold">Inicio</h1>
    </template>

    <h1>Buenas señor administrador {{ user?.nombre_completo }}</h1>


  </mi-card>


</template>
