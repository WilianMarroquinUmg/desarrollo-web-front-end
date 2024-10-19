<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";

const active = useState('activeItem');
active.value = 'PajasBuscador';
</script>

<template>

  <mi-card title="Buscador">
    <div class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="telefono">Telefono</label>
        <input type="text" id="telefono" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="fecha_nacimiento">Fecha de nacimiento</label>
        <input type="date" id="fecha_nacimiento" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="fecha_creacion">Fecha de creacion</label>
        <input type="date" id="fecha_creacion" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="fecha_actualizacion">Fecha de actualizacion</label>
        <input type="date" id="fecha_actualizacion" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="fecha_eliminacion">Fecha de eliminacion</label>
        <input type="date" id="fecha_eliminacion" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="estado">Estado</label>
        <input type="text" id="estado" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="tipo_documento">Tipo de documento</label>
        <input type="text" id="tipo_documento" />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="numero_documento">Numero de documento</label>
        <input type="text" id="numero_documento" />
      </div>
      <div
          class="flex flex-col space-y-2">
        <label for="id">Id</label>
        <input type="text" id="id" />
      </div>
    </div>
  </mi-card>

</template>

<style scoped>

</style>
