<script lang="ts">
import {defineComponent} from 'vue'
import navBarComponent from '../components/navbar.vue';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default defineComponent({
  name: "default",
  components: {navBarComponent}
})
</script>

<template>
  <header>
    <navBarComponent>

    </navBarComponent>
  </header>

  <slot></slot>


</template>

<style scoped>

</style>
