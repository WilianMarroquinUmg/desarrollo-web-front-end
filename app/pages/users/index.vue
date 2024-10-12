<script lang="ts" setup>
import {ref} from 'vue';
import MiCard from "~/components/personalized/MiCard.vue";
import {useAsyncData} from '#app';

import {useRouter} from 'vue-router';

const usersColumns = ref([
  {label: 'Nombre Completo', field: 'nombre_completo'},
  {label: 'Email', field: 'email'},
  {label: 'Opciones', field: 'opciones'},
]);

const users = ref([]);

let cliente = useSanctumClient();

let {data: userData} = await useAsyncData('getUsers', () => {
  return cliente('/api/users', {
    method: 'GET'
  });
});

users.value = userData.value;

const deleteUser = async (id: number) => {
  let {data: deletedUser} = await useAsyncData('deleteUser', () => {
    return cliente(`/api/users/${id}`, {
      method: 'DELETE'
    });
  });

  if (deletedUser.value) {
    users.value = users.value.filter((user: any) => user.id !== id);
  }
};

const editUser = (id: number) => {

  navigateTo(`/users/edit/${id}`);

};


</script>

<template>
  <div class="text-right mb-4">
    <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="primary"
        variant="solid"
        label="Nuevo Usuario"
        :trailing="false"
        to="/users/create"
    />
  </div>

  <mi-card borderColor="#e74c3c">
    <vue-good-table
        :columns="usersColumns"
        :rows="users"
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
            />
            <UButton
                  icon="i-heroicons-pencil-square"
                  size="sm"
                  color="yellow"
                  variant="solid"
                  @click="editUser(props.row.id)"
              />
            <UButton
                icon="i-heroicons-trash"
                size="sm"
                color="red"
                variant="solid"
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
