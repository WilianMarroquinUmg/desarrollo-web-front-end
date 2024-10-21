<script setup lang="ts">
import MiCard from '~/components/personalized/MiCard.vue';

const route = useRoute();

const item = ref({
  email: undefined,
  primer_nombre: undefined,
  segundo_nombre: undefined,
  primer_apellido: undefined,
  segundo_apellido: undefined,
  nombre_completo: undefined

});

let cliente = useSanctumRequest();

const getItem = async () => {

  try {

    const id = route.params.id;

    let res = await cliente.get(`/api/users/${id}`);

    item.value = res.data;


  } catch (e) {

    notifyError('Error', e.message);

  }

};

getItem();

const active = useState('activeItem');
active.value = 'users';
</script>


<template>

  <mi-card borderColor="#e74c3c">
    <template #header>
      <h1>{{ item.nombre_completo }}</h1>
    </template>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="font-weight-bold" for="">Primer Nombre:</label>
          <p v-text="item.primer_nombre"></p>
        </div>
        <div>
          <label class="font-weight-bold" for="">Segundo Nombre:</label>
          <p v-text="item.segundo_nombre"></p>
        </div>
        <div>
          <label class="font-weight-bold" for="">Primer Apellido:</label>
          <p v-text="item.primer_apellido"></p>
        </div>
        <div>
          <label class="font-weight-bold" for="">Segundo Apellido:</label>
          <p v-text="item.segundo_apellido"></p>
        </div>
        <div>
          <label class="font-weight-bold" for="">Email:</label>
          <p v-text="item.email"></p>
        </div>
      </div>

    <template #footer>
      <div>
        <UButton type="button" color="red" variant="soft" label="Regresar" @click="navigateTo('/users')" />
      </div>
    </template>
  </mi-card>

</template>

<style scoped></style>
