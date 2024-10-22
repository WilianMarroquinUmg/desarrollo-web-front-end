<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import MiCard from "~/components/personalized/MiCard.vue";
const {notifySuccess, notifyError} = useToastNotifications();

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
});

const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {

  try {

    const client = useSanctumRequest();

    let res = await client.post('/api/users', state);

    notifySuccess('Usuario Creado', res.data.message);

    navigateTo('/users');

  } catch (e) {

    notifyError('Error', e.message);

  }

};

const formRef = ref();

function submitForm() {
  if (formRef.value) {
    formRef.value.submit();
  }
}
</script>

<template>
  <mi-card>
    <template #header>
      <h1>Crear Usuario</h1>
    </template>

    <template #text>
      <p>Ingresa los datos a continuación para crear un nuevo Usuario.</p>
    </template>


    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
           ref="formRef"
    >

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <UFormGroup label="Primer Nombre" name="primer_nombre">
        <UInput v-model="state.primer_nombre" />
      </UFormGroup>

      <UFormGroup label="Segundo Nombre" name="segundo_nombre">
        <UInput v-model="state.segundo_nombre" />
      </UFormGroup>

      <!-- Segunda columna -->
      <UFormGroup label="Primer Apellido" name="primer_apellido">
        <UInput v-model="state.primer_apellido" />
      </UFormGroup>

      <UFormGroup label="Segundo Apellido" name="segundo_apellido">
        <UInput v-model="state.segundo_apellido" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UFormGroup label="Confirmar Password" name="password_confirmation">
        <UInput v-model="state.password_confirmation" type="password" />
      </UFormGroup>

      </div>
    </UForm>

    <template #footer>
      <div>
        <UButton type="button"
                 color="gray"
                 variant="solid"
                 label="Regresar"
                 icon="i-heroicons-arrow-left-end-on-rectangle"
                 to="/users"
                 class="mr-1"
        />
        <UButton type="button"
                 label="Guardar"
                 icon="i-heroicons-bookmark-square"
                 @click="submitForm"
        />
      </div>
    </template>



  </mi-card>



</template>
