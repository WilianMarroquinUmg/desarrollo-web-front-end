<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
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
</script>

<template>
  <UCard>
    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
    >
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

      <div class="buttons">
        <UButton type="submit">
          Submit
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
