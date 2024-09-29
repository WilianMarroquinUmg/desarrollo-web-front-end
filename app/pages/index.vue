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

  <h1>mi bux</h1>
</template>

<style scoped>

</style>
