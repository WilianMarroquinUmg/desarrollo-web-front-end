
<template>
  <div>
    <span class="text-danger" v-show="required">*</span>

    <multiselect
        v-model="item"
        :options="options"
        label="nombre"
        placeholder="Seleccione uno..."
        :disabled="disabled"
    >
      <template #noResult>
        <UButton label="Crear" icon="mdi-plus" @click.prevent="newItem" block />
      </template>
    </multiselect>

    <input type="hidden" :name="name" :value="getId(item)">

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h4 v-text="formTitle"></h4>
        </template>

        <div class="modal-body">
          <div class="row">
            <div class="form-group col-sm-6">
              <UFormGroup label="Nombre: ">
                <UInput v-model="editedItem.nombre" @keydown.enter.prevent="save"/>
              </UFormGroup>
            </div>
          </div>
        </div>

        <template #footer>
          <UButton label="Cancelar" icon="mdi-cancel" color="gray" class="mr-2" @click.prevent="close" />
          <UButton :label="loading ? 'GUARDANDO...' : 'GUARDAR'" icon="mdi-content-save-check" @click.prevent="save" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import multiselect from 'vue-multiselect';

// Props
const props = defineProps({
  label: {
    type: String,
    default: 'Puesto',
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: { // Cambiado a modelValue
    type: Object,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const loading = ref(false);
const item = ref(null);
const editedItem = ref({ id: 0, nombre: '' });
const items_api = ref([]);
const defaultItem = ref({ id: 0, nombre: '' });

const cliente = useSanctumRequest();
const { notifySuccess, notifyError } = useToastNotifications();

// Métodos
const getId = (item) => (item ? item.id : null);

const newItem = () => {
  isOpen.value = true;
  editedItem.value = { ...defaultItem.value };
};

const editItem = (selectedItem) => {
  isOpen.value = true;
  editedItem.value = { ...selectedItem };
};

const close = () => {
  isOpen.value = false;
  loading.value = false;
  setTimeout(() => {
    editedItem.value = { ...defaultItem.value };
  }, 300);
};

const save = async () => {
  loading.value = true;
  try {
    const data = editedItem.value;
    let res;
    if (editedItem.value.id === 0) {
      res = await cliente.post('api/direcciones', data);
      notifySuccess('Dirección creada con éxito');
    } else {
      res = await cliente.put(`api/direcciones/${editedItem.value.id}`, data);
      notifySuccess('Dirección actualizada con éxito');
    }

    const updatedItem = res.data;
    actualizaSelect(updatedItem);
    close();
    fetchDirecciones();

  } catch (e) {
    console.error(e);
    notifyError('Error al guardar la dirección');
    loading.value = false;
  }
};

const actualizaSelect = (newItem) => {
  item.value = newItem;
  const existingItemIndex = props.items.findIndex(i => i.id === newItem.id);
  if (existingItemIndex !== -1) {
    props.items.splice(existingItemIndex, 1, newItem);
  } else {
    props.items.push(newItem);
  }
};

// Fetch items when component is mounted
const fetchDirecciones = async () => {
  if (props.items.length === 0) {
    try {
      const response = await cliente.get('api/direcciones');
      items_api.value = response.data;  // Asigna las direcciones obtenidas a items_api
    } catch (error) {
      console.error('Error fetching direcciones:', error);
    }
  }
};

// Ejecutar cuando el componente se monta
onMounted(() => {
  fetchDirecciones();
  item.value = props.modelValue; // Asigna el valor inicial del modelValue a item
});

// Computed
const formTitle = computed(() => (editedItem.value.id === 0 ? 'Nueva Dirección' : 'Editar Dirección'));
const options = computed(() => (props.items.length > 0 ? props.items : items_api.value));

// Watchers
watch(
    () => props.modelValue, // Observa cambios en modelValue
    (val) => {
      item.value = val; // Asigna el valor de modelValue a item
    },
    { immediate: true }
);

watch(item, (val) => {
  emit('update:modelValue', val); // Emite el evento update:modelValue con el valor de item
});
</script>
