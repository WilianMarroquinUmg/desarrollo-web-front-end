<template>
  <div class="timeline">
    <div class="timeline-items">
      <div v-for="(item, index) in items" :key="index" class="timeline-item" :class="{ 'dueño-actual': index === 0 }">
        <div class="timeline-item-header">
          <h4 class="timeline-item-title" style="font-weight: bold">
            Adquirio por medio de
            {{ item?.transaccion?.nombre }}
            <span v-if="index === 0" class="dueño-actual-text"> (Dueño Actual)</span>
          </h4>
        </div>
        <div class="timeline-item-content">
          <p><strong>Residente:</strong> {{ item?.residente?.nombre_completo }}</p>
          <p><strong>Fecha Adquisición:</strong> {{ formatoFecha(item.created_at) }}</p>
          <p><strong>Observación:</strong> {{ item?.observaciones }}</p>
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

  return date.toLocaleString('es-ES', options).replace(',', ' a las ');
}
</script>

<style scoped>
.timeline {
  position: relative;
  padding: 0px 0;
}

.timeline-items {
  list-style: none;
  position: relative;
  max-height: 300px;
  overflow-y: scroll;
}

.timeline-item {
  margin: 10px;
  margin-bottom: 15px;
  padding-left: 20px;
  position: relative;
  background: #eff8ff;
  border-left: 2px solid #007bff;
  border-radius: 10px;
  padding: 7px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  height: 100%;


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
  color: #6c757d;
  font-size: 0.9em;
}

.timeline-item-content {
  margin-top: 10px;
  font-family: Arial;
  margin-left: 20px;
}

.timeline-item-content p {
  margin: 0;
}

.dueño-actual-text {
  font-size: 0.8em;
  color: greenyellow;
}
</style>
