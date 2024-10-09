<script lang="ts">
import {defineComponent} from 'vue'
import UiParentCard from '@/components/shared/UiParentCard.vue';

export default defineComponent({
  name: "index",

  data() {
    return {
      usersColumns: [
        {key: 'nombre_completo', label: 'Nombre Completo'},
        {key: 'email', label: 'Email'},
      ],
      users: []
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
        />
      </div>
      <UiParentCard>
        <UTable :rows="users"
                :columns="usersColumns"
        />
      </UiParentCard>
    </v-col>
  </v-row>


</template>

<style scoped>

</style>
