<script lang="ts">
import {defineComponent} from 'vue'
import UiParentCard from '@/components/shared/UiParentCard.vue';

export default defineComponent({
  name: "index",
  data() {
    return {
      people: [{
        id: 1,
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member'
      }, {
        id: 2,
        name: 'Courtney Henry',
        title: 'Designer',
        email: 'courtney.henry@example.com',
        role: 'Admin'
      }, {
        id: 3,
        name: 'Tom Cook',
        title: 'Director of Product',
        email: 'tom.cook@example.com',
        role: 'Member'
      }, {
        id: 4,
        name: 'Whitney Francis',
        title: 'Copywriter',
        email: 'whitney.francis@example.com',
        role: 'Admin'
      }, {
        id: 5,
        name: 'Leonard Krasner',
        title: 'Senior Designer',
        email: 'leonard.krasner@example.com',
        role: 'Owner'
      }, {
        id: 6,
        name: 'Floyd Miles',
        title: 'Principal Designer',
        email: 'floyd.miles@example.com',
        role: 'Member'
      }]

    }
  },
  components: {
    UiParentCard
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
        <UTable :rows="people"/>
      </UiParentCard>
    </v-col>
  </v-row>


</template>

<style scoped>

</style>
