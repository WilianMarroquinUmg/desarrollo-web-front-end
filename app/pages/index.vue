<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "index",
  layout: 'default',
  data() {
    return {
      title: 'Hola desde Nuxt.js 3', // Título inicial
      orders: 4805, // Número de órdenes
      percentageChange: '+2.5%' // Cambio porcentual
    }
  },
  methods: {
    changeTitle() {
      // Cambia el título dinámicamente cuando se llama al método
      this.title = 'Nuevo Título de la Tarjeta'
      console.log('Título cambiado a: ' + this.title)
    }
  }
})
</script>

<template>
  <!-- Card mejorado -->
  <div class="card-container">
    <div class="card radius-10 shadow-lg border-start border-0 border-4 border-info">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div>
            <p class="mb-0 text-secondary">{{ title }}</p> <!-- Título dinámico -->
            <h4 class="my-1 text-info">{{ orders }}</h4> <!-- Total de órdenes -->
            <p class="mb-0 font-13">{{ percentageChange }} desde la semana pasada</p> <!-- Cambio porcentual -->
          </div>
          <div class="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto">
            <i class="bx bxs-cart"></i> <!-- Icono de carrito -->
          </div>
        </div>
      </div>
    </div>

    <!-- Botón para cambiar el título -->
    <div class="text-center mt-3">
      <v-btn color="primary" @click="changeTitle">Cambiar Título</v-btn>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  max-width: 500px;
  margin: 0 auto;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
}

.widgets-icons-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
}

.bg-gradient-blues {
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
}

.v-btn {
  transition: background-color 0.3s;
}

.v-btn:hover {
  background-color: #5e72e4;
}
</style>
