<script lang="ts" setup>

definePageMeta({
  middleware: ['sanctum:auth'],
});

useState('activeItem', () => '');

</script>

<template>

  <v-locale-provider>
    <v-app style="background: #faf6f4">
      <LayoutFullMain/>
      <v-main >
        <v-container fluid class="page-wrapper">
          <div class="maxWidth">
            <slot/>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>

</template>

<style scoped>

</style>
