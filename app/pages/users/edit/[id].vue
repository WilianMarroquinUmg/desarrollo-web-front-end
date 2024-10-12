<script setup lang="ts">

import {useRoute} from "vue-router";
import MiCard from "~/components/personalized/MiCard.vue";
import {object, string} from "yup";

const route = useRoute();
import type {FormSubmitEvent} from '#ui/types';
import {reactive} from "vue";

const parametro = route.params.id;

const schema = object({
  primer_nombre: string().required('Required'),
  segundo_nombre: string().required('Required'),
  primer_apellido: string().required('Required'),
  segundo_apellido: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required'),
  password_confirmation: string().required('Required')
});
const state = reactive({
  email: undefined,
  password: undefined,
  primer_nombre: undefined,
  segundo_nombre: undefined,
  primer_apellido: undefined,
  segundo_apellido: undefined,
  password_confirmation: undefined

})

let cliente = useSanctumClient();

let {data: userData} = await useAsyncData('getUser', () => {
  return cliente(`/api/users/${parametro}`, {
    method: 'GET'
  });
});

state.email = userData.value.email;
state.primer_nombre = userData.value.primer_nombre;
state.segundo_nombre = userData.value.segundo_nombre;
state.primer_apellido = userData.value.primer_apellido;
state.segundo_apellido = userData.value.segundo_apellido;

</script>

<template>

  <mi-card borderColor="#e74c3c">

    <template #header>
      <h1>Editar el usuario: {{ state.primer_nombre + " " + state.primer_apellido}}</h1>
    </template>


    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
    >
      <UFormGroup label="Primer Nombre" name="primer_nombre">
        <UInput v-model="state.primer_nombre"/>
      </UFormGroup>

      <UFormGroup label="Segundo Nombre" name="segundo_nombre">
        <UInput v-model="state.segundo_nombre"/>
      </UFormGroup>

      <!-- Segunda columna -->
      <UFormGroup label="Primer Apellido" name="primer_apellido">
        <UInput v-model="state.primer_apellido"/>
      </UFormGroup>

      <UFormGroup label="Segundo Apellido" name="segundo_apellido">
        <UInput v-model="state.segundo_apellido"/>
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email"/>
      </UFormGroup>

    </UForm>


    <template #footer>
      <div>

        <UButton type="submit"
                 color="red"
                 variant="soft"
                 label="Regresar"
                  @click="navigateTo('/users')"
        />

        <UButton type="submit"
                 label="Guardar"
        />

      </div>
    </template>
  </mi-card>

</template>

<style scoped>

</style>
