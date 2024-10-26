<script setup lang="ts">
import {ref} from 'vue';
import Esperar from "~/components/personalized/esperar.vue";

const toast = useToast()

const checkbox = ref(true);

const {login} = useSanctumAuth();


interface DatosUsuario {
  name: string;
  email: string

}

const esperar = ref(false);

const userCredentials = ref({})

const submit = async () => {
  try {

    esperar.value = true;

    await login(userCredentials.value);

    toast.add({
      title: "Login Successful",
      description: "You have been successfully logged in",
      icon: 'mdi:account-check',
    });

  } catch (err) {

    esperar.value = false;

    toast.add({
      title: "Error al intentar autenticarse",
      description: err.response._data.message,
      icon: 'mdi:account-remove',
      color: 'red'

    });

  }
};

</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Username</v-label>
      <v-text-field
          variant="outlined"
          hide-details color="primary"
          v-model="userCredentials.email"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Password</v-label>
      <v-text-field variant="outlined"
                    type="password"
                    hide-details color="primary"
                    v-model="userCredentials.password"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="pt-3">
      <v-btn color="primary"
             size="large"
             block flat
             @click="submit"
      >
        Iniciar Sesión
      </v-btn>
    </v-col>
  </v-row>
  <esperar :is-visible="esperar" />

</template>

