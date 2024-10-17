<script lang="ts">
import {defineComponent} from 'vue'
import MiCard from "~/components/personalized/MiCard.vue";

export default defineComponent({
  name: "prueba",
  components: {MiCard}
})
</script>

<template>
  <u-container>

    <mi-card title="Mi Card" borderColor="#1e272e">
      <div>
        <h1>Card Content</h1>
        <p>Card content goes here...</p>
      </div>
    </mi-card>

  </u-container>

</template>

<style scoped>

</style>
