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
    <UAccordion
        color="blue"
        variant="solid"
        size="sm"
        :items="items"
    >
      <template v-for="item in items" :key="item.slot" v-slot:[item.slot]>

        <time-line :items="item.data.bitacoras" />

      </template>
    </UAccordion>
  </mi-card>
</template>

<style scoped>
</style>
