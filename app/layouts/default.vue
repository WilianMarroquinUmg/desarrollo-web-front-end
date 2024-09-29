<script lang="ts">
import {defineComponent} from 'vue'
import navBarComponent from '../components/navbar.vue';


export default defineComponent({
  name: "default",
  components: {navBarComponent}
})
</script>

<template>
  <header>
    <navBarComponent/>
  </header>

  <slot></slot>


</template>

<style scoped>

</style>
