<script lang="ts">
import {defineComponent} from 'vue'

//definir el layaut
export default defineComponent({
  name: "index",
  layout: 'default',
  data(){
    return {
      title: 'Hola desde Nuxt.js 3'
    }
  },
  methods: {
    changeTitle(){
      console.log('Cambiando el titulo')
    }
  }
})

</script>

<template>

  <UButton color="primary" variant="solid">Button</UButton>


</template>

<style scoped>

</style>
