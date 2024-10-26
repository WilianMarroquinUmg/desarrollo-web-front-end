<script setup lang="ts">

definePageMeta({
  title: 'Login',
  meta: [
    {
      name: 'description',
      content: 'Login page of Modernize NuxtJS Admin Dashboard'
    }
  ],
  layout: 'auth'
});
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center ">
                <img src="/images/logoLogin.jpg" style="width: 50%; border-radius: 30px" alt="">
              </div>
              <AuthLoginForm/>

            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
