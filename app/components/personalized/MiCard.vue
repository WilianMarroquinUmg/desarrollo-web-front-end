<template>
  <div class="card" :style="{ borderTop: '3px solid #0CCDE1 '}">
    <div class="card-header">
      <slot name="header"></slot>
    </div>

    <div class="card-texto-informativo">
      <slot name="text"></slot>
    </div>


    <div class="card-body">
      <slot></slot>
    </div>

    <div class="card-footer">
      <slot name="footer"></slot>
    </div>


  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Card Title'
  },
  footer: {
    type: String,
    default: null
  },
  borderColor: {
    type: String,
    default: '#3498db' // Cambia el color por el que prefieras
  }
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
}

.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.card-body {
  padding: 10px;
}

.card-footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 15px;
  text-align: right;
  color: #888;
}

.card-texto-informativo {
  padding-bottom: 10px;
  margin-bottom: 0px;
  font-size: 14px;
  font-weight: bold;
  color: #888;
  text-align: center;
}

</style>
