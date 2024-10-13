
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { InferType } from 'yup';
import { validaciones, UserForm } from '~/types/personalizados/User';
import type { FormSubmitEvent } from '#ui/types';

const active = useState('activeItem');
active.value = 'users';

const toast = useToast();

const schema = validaciones;

const state = reactive<UserForm>({
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {
  try {
    const client = useSanctumClient();

    const { data, error, refresh } = await useAsyncData('createUser', () =>
        client('/api/users', {
          method: 'POST',
          body: state
        })
    );

    if (error.value) {
      throw new Error(error.value.data.message);
    }

    toast.add({
      title: 'Usuario Creado!',
      description: data.value.message,
      icon: 'mdi:account-check',
    });

    refresh();

    navigateTo('/users');

  } catch (e: any) {
    toast.add({
      title: 'Error al intentar crear el usuario',
      description: e.message,
      icon: 'mdi:account-remove',
      color: 'red'
    });
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
