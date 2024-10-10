<script lang="ts">
import {defineComponent} from 'vue'
import UiParentCard from '@/components/shared/UiParentCard.vue';

export default defineComponent({
  name: "index",

  data() {
    return {
      usersColumns: [
        {key: 'id', label: 'Id', sortable: true},
        {key: 'nombre_completo', label: 'Nombre'},
        {key: 'nombre_completo', label: 'Ema'},
        {key: 'email', label: 'Email'},
      ],
      users: [],
      query: '',
      page: 1,
      pageCount: 5,

    }
  },

  components: {
    UiParentCard
  },

  methods: {
    async getUsers() {

      try {

        let cliente = useSanctumClient()

        let { data, error } = await useAsyncData('getUsers',  () => {
          return cliente('/api/users', {
            method: 'GET'
          })
        })

        if (error.value) {

          throw new Error(error.value.data.message)

        }

        console.log(data.value)
        this.users = data.value

      } catch (error) {

        console.log(error)

      }

    }
  },

  mounted() {
    this.getUsers()
  },

  computed: {
    filteredUsers() {
      if (!this.query) {
        return this.users
      }

      return this.users.filter((user) => {
        return Object.values(user).some((value) => {
          return String(value).toLowerCase().includes(this.query.toLowerCase())
        })
      })
    },

    rows() {
      return this.filteredUsers.slice((this.page - 1) * this.pageCount, (this.page) * this.pageCount)
    }
  }

})
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
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
      <UiParentCard>

        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
          <UInput v-model="query" placeholder="Filter people..." />
        </div>

        <UTable :rows="rows"
                :columns="usersColumns"
                sort-asc-icon="i-heroicons-arrow-up-20-solid"
        />

        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
          <UPagination v-model="page" :page-count="pageCount" :total="users.length" />
        </div>

      </UiParentCard>
    </v-col>
  </v-row>


</template>

<style scoped>

</style>
