<template>
  <div>
    <mi-card borderColor="#e74c3c">
    <vue-good-table
        :columns="columns"
        :rows="users"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 5 }"
    >
      <template #table-row="{ column, row }">
        <span v-if="column.field === 'website'">
          <a :href="`http://${row.website}`" target="_blank">{{ row.website }}</a>
        </span>
        <span v-else>{{ row[column.field] }}</span>
      </template>
    </vue-good-table>
    </mi-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAsyncData } from '#app';
import MiCard from "~/components/personalized/MiCard.vue";

const users = ref([]);
const columns = [
  { label: 'Name', field: 'name' },
  { label: 'Username', field: 'username' },
  { label: 'Email', field: 'email' },
  { label: 'Website', field: 'website' }
];


let cliente = useSanctumClient();

let { data: userData } = await useAsyncData('getUsers', () => {
  return cliente('/api/users', {
    method: 'GET'
  });
});

users.value = userData.value;
</script>

<style>
/* You can add custom styles here */
</style>
