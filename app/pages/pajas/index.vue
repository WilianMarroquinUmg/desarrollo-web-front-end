<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue';
import MiCard from "~/components/personalized/MiCard.vue";

export default defineComponent({
  name: "index",
  components: {MiCard},

  setup() {
    const cliente = useSanctumRequest();
    const {notifyError} = useToastNotifications();

    const active = useState('activeItem');
    active.value = 'PajaAgua';


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
        notifyError(error);
      }
    };

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
  <div class="text-right mb-4">
    <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="blue"
        variant="solid"
        label="Nueva Paja de Agua"
        :trailing="false"
        to="/pajas/nueva"
    />
  </div>

  <mi-card>
    <template #header>
      <h1>Pajas de Agua</h1>
    </template>

    <template #text>
      <p>Listado de dueños de pajas de agua.</p>
    </template>

    <vue-good-table
        :columns="columnsItems"
        :rows="pajas"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
    >
      <template #table-row="props">
        <span v-if="props.column.field == 'opciones'">

          <UTooltip text="Vizualizar">
            <UButton
                icon="i-heroicons-eye"
                size="sm"
                color="blue"
                variant="solid"
                :to="'/pajas/detalles/' + props.row.residente_id"
                class="mr-1"
            />
          </UTooltip>

          <UTooltip text="Trasladar">
               <UButton
                   icon="mdi-arrow-collapse-right"
                   size="sm"
                   color="orange"
                   variant="solid"
                   :to="'/pajas/trasladar/' + props.row.residente_id"
                   class="mr-1"
               />
            </UTooltip>
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
