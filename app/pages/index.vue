<script setup lang="ts">

definePageMeta({
    title: 'Dashboard',
    layout: 'default',
});

const user = useSanctumUser()

</script>
<template>
    <v-row>

      <v-card>
        <v-card-title>
          <h2>Resumen de ventas</h2>
        </v-card-title>
        <v-card-text>
          <p>bienvenido {{ user.name }}</p>

        </v-card-text>
      </v-card>

    </v-row>
</template>
