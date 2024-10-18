<script setup lang="ts">
import Swal from 'sweetalert2';

const cliente = useSanctumRequest();

const toast = useToast()

const users = ref([]);  // Declaramos una referencia para almacenar los usuarios
const loading = ref(true);  // Estado de carga

const fetchUsers = async () => {
  try {

    users.value = await cliente.get('/api/users');

  } catch (error) {

    console.log(error.message);

    toast.add({
      title: 'Error',
      icon: 'mdi-close-box',
      color: 'red',
      description: error.message

    });

  } finally {

    loading.value = false;

  }

};

definePageMeta({
  title: 'Dashboard',
  layout: 'default',
});

const active = useState('activeItem');
active.value = 'home';

const user = useSanctumUser();
</script>

<template>
  <v-row>
    <v-card>
      <v-card-title>
        <h2>Bienvenido <span v-text="user?.nombre_completo"></span></h2>
      </v-card-title>
      <v-card-text>
        <!-- Muestra un mensaje mientras se cargan los usuarios -->
        <div v-if="loading">Cargando usuarios...</div>
        <div v-else>
          <ul>
            <!-- Itera sobre los usuarios obtenidos -->
            <li v-for="user in users" :key="user.id">{{ user.name }} ({{ user.email }})</li>
          </ul>
        </div>


        <i class="ti ti-a-b-2"></i>

        pencil-square
        <UButton
            icon="i-heroicons-bookmark-square"
            size="sm"
            color="pink"
            variant="solid"
            label="Obtener Users"
            :trailing="false"
            @click="fetchUsers"
        />

      </v-card-text>


    </v-card>
  </v-row>
</template>

<style scoped>
/* Estilos personalizados */
</style>
