<script setup lang="ts">
import {ref} from 'vue';

const toast = useToast()

const checkbox = ref(true);

const {login} = useSanctumAuth();

const userCredentials = ref({})

const submit = async () => {
  try {

    await login(userCredentials.value);

    toast.add({
      title: "Login Successful",
      description: "You have been successfully logged in",
      icon: 'mdi:account-check',
      color: 'success'
    });

  } catch (err) {

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
    <v-col cols="12" class="pt-0">
      <div class="d-flex flex-wrap align-center ml-n2">
        <v-checkbox v-model="checkbox" color="primary" hide-details>
          <template v-slot:label class="text-body-1">Remeber this Device</template>
        </v-checkbox>
        <div class="ml-sm-auto">
          <NuxtLink to="/"
                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">Forgot
            Password ?
          </NuxtLink>
        </div>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn color="primary"
             size="large"
             block flat
             @click="submit"
      >
        Sign in
      </v-btn>
    </v-col>
  </v-row>
</template>

