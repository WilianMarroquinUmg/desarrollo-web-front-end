<script setup lang="ts">
const items = [{
  label: 'Getting Started',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  slot: 'getting-started'
}, {
  label: 'Installation',
  icon: 'i-heroicons-arrow-down-tray',
  defaultOpen: true,
  slot: 'installation'
},
]

const slots = ref([
  'getting-started',
  'installation'
])

</script>

<template>
  <UAccordion :items="items" variant="solid">

    <template #default="{ item }">

      <template v-for="slot in slots" v-if="item.slot === slot">

        <h1 v-text="slot"></h1>

      </template>
    </template>


  </UAccordion>
</template>

