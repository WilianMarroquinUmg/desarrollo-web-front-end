<script setup lang="ts">
import Swal from 'sweetalert2';

definePageMeta({
  title: 'Dashboard',
  layout: 'default',
});

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#04fa01",
  cancelButtonColor: "#e62900",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});

const active = useState('activeItem');
active.value = 'home';

const user = useSanctumUser();
</script>

<template>
  <v-row>
    <v-card>
      <v-card-title>
        <h2>Bienvenido <span v-text="user?.nombre_completo"></span> </h2>
      </v-card-title>
      <v-card-text>
        <v-btn @click="showSwal">Mostrar Alerta</v-btn>
      </v-card-text>
    </v-card>

  </v-row>
</template>

<style scoped>

</style>
