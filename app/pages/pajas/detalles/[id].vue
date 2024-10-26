<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";
import TimeLine from "~/components/personalized/TimeLine.vue";

const cliente = useSanctumRequest()
const { notifyError, notifySuccess } = useToastNotifications()

const items = ref([])

const route = useRoute();
const residente_id = route.params.id;

const getDetalles = async () => {
  try {
    let res = await cliente.get(`api/paja-aguas/getDetalles/residente${residente_id}`);
    items.value = formatearItems(res.data);
  } catch (error) {
    notifyError(error);
  }
};

const formatearItems = (items) => {
  return items.paja_aguas.map(item => {
    return {
      label: item.correlativo,
      icon: "document-text",
      slot: item.id,
      data: item
    }
  })
}

const urlBase = useSanctumConfig().baseUrl;
const getDocumento = async (id)  => {
  try {

    console.log('fetchHTML');
    let res = await cliente.get(`api/paja-aguas/get/certificado/${id}`);

    let url = urlBase + res.data;

    window.open(url, '_blank');
    window.focus();

  } catch (error) {


    notifyError(error);

  }
};

getDetalles();
</script>

<template>
  <div class="text-right mb-4">
    <UButton
        icon="i-heroicons-arrow-left-end-on-rectangle"
        size="sm"
        color="gray"
        variant="solid"
        label="Regresar"
        :trailing="false"
        to="/pajas"
    />
  </div>
  <mi-card>

    <template #header>
      <h1>Detalles Paja de Agua</h1>
    </template>

    <template #text>
      <h1 class="text-center">Historial de movimientos de las pajas de agua, ordenados del más reciente al más antiguo.</h1>
    </template>

    <UAccordion
        color="blue"
        variant="solid"
        size="sm"
        :items="items"
    >
      <template v-for="item in items" :key="item.slot" v-slot:[item.slot]>


          <UButton @click="getDocumento(item.data.id)"
                   color="green"
                   variant="solid"
                   size="sm"
                   icon="i-heroicons-printer"
                   label="Imprimir Certificado"
                   block
                   style="margin-bottom: 10px"

          />

        <time-line :items="item.data.bitacoras" />

      </template>
    </UAccordion>
  </mi-card>
</template>

<style scoped>
</style>
