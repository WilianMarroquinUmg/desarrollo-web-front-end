<script setup lang="ts">
import MiCard from '~/components/personalized/MiCard.vue';

const route = useRoute();

const item = ref( {{ fields }} );

let cliente = useSanctumRequest();

const getItem = async () => {

  try {

    const id = route.params.id;

    let res = await cliente.get(`{{ url }}/${id}`);

    item.value = res.data;

  } catch (e) {

    notifyError('Error', e.message);

  }

};

const fiels = Object.keys( {{ fields }} );

getItem();

const active = useState('activeItem');
active.value = '{{ model }}';

</script>


<template>

  <mi-card borderColor="#e74c3c">
    <template #header>
      <h1>{{ item.nombre_completo }}</h1>
    </template>

    <div class="grid grid-cols-2 gap-4">

      <div
           :key="index"
      >
        <label class="font-weight-bold"
               for=""
               v-text="Object.keys(item)[index]"
        ></label>
        <p v-text="item.nombre"></p>
      </div>

    </div>

    <template #footer>
      <div>
        <UButton type="button" color="red" variant="soft" label="Regresar" @click="navigateTo('/{{ directory }}')" />
      </div>
    </template>
  </mi-card>

</template>

<style scoped></style>
