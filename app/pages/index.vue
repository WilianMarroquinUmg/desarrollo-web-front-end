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
          <h2>Bienvenido <span v-text="user?.nombre_completo"></span> </h2>
        </v-card-title>
        <v-card-text>


        </v-card-text>
      </v-card>

    </v-row>
</template>
