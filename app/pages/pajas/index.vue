<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import MiCard from "~/components/personalized/MiCard.vue";

export default defineComponent({
  name: "index",
  components: { MiCard },

  setup() {
    const cliente = useSanctumRequest();
    const { notifyError } = useToastNotifications();

    // Reactive variables
    const pajas = ref<any[]>([]);
    const columnsItems = ref([
      {
        "label": "Residente",
        "field": "residente.nombre_completo"
      },
      {
        "label": "DPI",
        "field": "residente.dpi"
      },
      {
        "label": "Cantidad Pajas",
        "field": "residente.cantidad_pajas_agua",
      },
      {
        "label": "Opciones",
        "field": "opciones",
      }
    ]);

    // Method to fetch pajas
    const getPajas = async () => {
      try {
        let res = await cliente.get('api/paja-aguas');
        pajas.value = res.data;
      } catch (error) {
        console.log(error);
        notifyError(error);
      }
    };

    // Hook to call getPajas when the component is mounted
    onMounted(() => {
      getPajas();
    });

    return {
      pajas,
      columnsItems,
      getPajas
    };
  }
});
</script>

<template>
  <mi-card>
    <template #header>
      <h1>Pajas de Agua</h1>
    </template>

    <vue-good-table
        :columns="columnsItems"
        :rows="pajas"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
    >
      <template #table-row="props">
        <span v-if="props.column.field == 'opciones'">
          <UButton
              icon="i-heroicons-eye"
              size="sm"
              color="blue"
              variant="solid"
              :to=" 'detalles/' + props.row.id"
              class="mr-1"
          />
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </mi-card>
</template>

<style scoped>
/* Agrega estilos si es necesario */
</style>
