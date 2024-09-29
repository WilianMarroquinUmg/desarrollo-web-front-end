<script lang="ts">
import {defineComponent} from 'vue'
import Sidebar from "~/components/sidebar.vue";

export default defineComponent({
  name: "default",
  components: {Sidebar}
})
</script>

<template>
  <div>
    <header>
      <h1>Header</h1>
    </header>
    <main>
      <sidebar></sidebar>

      <slot></slot>
    </main>
    <footer>
      <h1>Footer</h1>
    </footer>
  </div>

</template>

<style scoped>

</style>
