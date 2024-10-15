<script lang="ts" setup>
import {ref} from 'vue';
import MiCard from "~/components/personalized/MiCard.vue";

const { AlertCuestion } = useSweetAlert2();

const cliente = useSanctumRequest();

const {notifySuccess, notifyError} = useToastNotifications();

const columnsItems = ref([
  {label: 'Nombre Completo', field: 'nombre_completo'},
  {label: 'Email', field: 'email'},
  {label: 'Opciones', field: 'opciones', thClass: 'text-center', tdClass: 'text-center', width: '150px'},
]);

let items = ref([]);

const getItems = async () => {

  try {

    let res  = await cliente.get('/api/users');

    items.value = res.data

  } catch (e) {

    console.log(e.message);

  }

}

getItems();

const deleteItem = async (id: number) => {

  if ((await AlertCuestion('¿Estas seguro de eliminar este usuario?')).isConfirmed) {

    try {

      let res = await cliente.delete(`/api/users/${id}`);

      notifySuccess('Usuario Elimiado', res.data.message);

      await getItems();

    } catch (e) {

      notifyError('Error', e.message);

    }

  }

};

const active = useState('activeItem');
active.value = 'User';

</script>

<template>
  <div class="text-right mb-4">
    <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="primary"
        variant="solid"
        label="Nuevo"
        :trailing="false"
        to="/users/create"
    />
  </div>

  <mi-card borderColor="#e74c3c">
    <vue-good-table
        :columns="columnsItems"
        :rows="items"
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
                class="mr-1"
                :to="`/users/show/${props.row.id}`"
            />
            <UButton
                icon="i-heroicons-pencil-square"
                size="sm"
                color="yellow"
                variant="solid"
                :to="`/users/edit/${props.row.id}`"
                class="mr-1"
            />
            <UButton
                icon="i-heroicons-trash"
                size="sm"
                color="red"
                variant="solid"
                @click="deleteItem(props.row.id)"
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
</style>
