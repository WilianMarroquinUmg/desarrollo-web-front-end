<script lang="ts">
import {defineComponent} from 'vue'

//definir el layaut
export default defineComponent({
  name: "index",
  layout: 'default',
  data() {
    return {
      title: 'Hola desde Nuxt.js 3'
    }
  },
  methods: {
    changeTitle() {
      console.log('Cambiando el titulo')
    }
  }
})

</script>

<template>
//definir card
  <div class="card radius-10 border-start border-0 border-4 border-info">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div>
          <p class="mb-0 text-secondary">Total Orders</p>
          <h4 class="my-1 text-info">4805</h4>
          <p class="mb-0 font-13">+2.5% from last week</p>
        </div>
        <div class="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto"><i class="bx bxs-cart"></i>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>
