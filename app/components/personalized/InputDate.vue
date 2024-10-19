<template>
  <mi-card>
    <UFormGroup>
      <input
          type="date"
          class="input-date"
          v-model="dateValue"
          @input="updateDate"
      />
    </UFormGroup>
  </mi-card>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

// Definir el evento emit
const emit = defineEmits(['update:modelValue']);

const dateValue = ref<string | null>(null);

const updateDate = () => {
  emit('update:modelValue', dateValue.value);
};
</script>

<style scoped>
.input-date {
  width: 100%;
  padding: 10px;
  border: 1px solid #28a745;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-date:focus {
  outline: none;
  border: 1px solid #218838;
}

.input-date:hover {
  border: 1px solid #1e7e34;
}
</style>
