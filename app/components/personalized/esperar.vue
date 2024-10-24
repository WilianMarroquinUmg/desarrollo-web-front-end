<template>
  <UModal v-model="modalVisible"
          prevent-close
  >

    <div style="padding: 5vh; height: 20vh;" class="text-center">
      <h1 style="font-weight: bold">Espera por favor!</h1>
    </div>


  </UModal>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const modalVisible = ref(props.isVisible);

    // Observa cambios en la propiedad isVisible
    watch(
        () => props.isVisible,
        (newValue) => {
          modalVisible.value = newValue; // Actualiza la visibilidad del modal
        }
    );

    return {
      modalVisible,
    };
  },
};
</script>

<style>
/* Aquí puedes agregar estilos personalizados si es necesario */
</style>
