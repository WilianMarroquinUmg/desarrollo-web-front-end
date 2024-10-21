<template>
  <div class="timeline">
    <div class="timeline-items">
      <div v-for="(item, index) in items" :key="index" class="timeline-item">
        <div class="timeline-item-header">
          <h4 class="timeline-item-title">{{ item?.transaccion?.nombre }}</h4>
          <span class="timeline-item-time" v-text="formatoFecha(item.created_at)"></span>
        </div>
        <div class="timeline-item-content">
          <p><strong>Residente:</strong> {{ item?.residente?.nombre_completo }}</p>
          <p><strong>Comentario:</strong> {{ item?.observaciones }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array,
    required: true
  }
});

const formatoFecha = (fecha) => {
  const date = new Date(fecha);

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  // Utiliza toLocaleString para formatear la fecha
  return date.toLocaleString('es-ES', options).replace(',', ' a las ');
}

</script>

<style scoped>
.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline-items {
  list-style: none;
  position: relative;
}

.timeline-item {
  margin-bottom: 20px;
  padding-left: 20px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  height: 100%;
  border-left: 2px solid #007bff; /* Cambia el color según tu diseño */
}

.timeline-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.timeline-item-title {
  font-size: 1.2em;
}

.timeline-item-time {
  color: #6c757d; /* Color gris para la hora */
  font-size: 0.9em;
}

.timeline-item-content {
  margin-top: 10px;
}

.timeline-item-content p {
  margin: 0; /* Elimina el margen por defecto de los párrafos */
}
</style>
