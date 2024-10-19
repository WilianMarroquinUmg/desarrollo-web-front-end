<script setup lang="ts">
import type {Avatar} from '#ui/types'

const people = [{
  id: 'benjamincanac',
  label: 'benjamincanac',
}, {
  id: 'Atinux',
  label: 'Atinux',
}, {
  id: 'smarroufin',
  label: 'smarroufin',
},
  {
    id: 'nobody',
    label: 'Nobody',
  }]

const selected = ref('nobody')
</script>

<template>

  <p v-text="selected"></p>

  <USelectMenu v-model="selected"
               :options="people"
               option-attribute="label"
               placeholder="Select people"
               value-attribute="id"
  >
  </USelectMenu>
</template>

