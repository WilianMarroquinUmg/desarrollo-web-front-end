<script setup lang="ts">
import { useRoute } from 'vue-router';
import MiCard from '~/components/personalized/MiCard.vue';
import { object, string, InferType } from 'yup';
import { ref, reactive } from 'vue';
import type { FormSubmitEvent } from '#ui/types';

const toast = useToast();
const route = useRoute();
const parametro = route.params.id;

const schema = object({
  primer_nombre: string().required('Required'),
  segundo_nombre: string().required('Required'),
  primer_apellido: string().required('Required'),
  segundo_apellido: string().required('Required'),
  email: string().email('Email Invalido').required('Required'),

});

const state = reactive({
  email: undefined,
  primer_nombre: undefined,
  segundo_nombre: undefined,
  primer_apellido: undefined,
  segundo_apellido: undefined,
  password: undefined,
  password_confirmation: undefined,
});

const formRef = ref(); // Crear referencia para el formulario

let cliente = useSanctumClient();

let { data: userData } = await useAsyncData('getUser', () => {
  return cliente(`/api/users/${parametro}`, {
    method: 'GET'
  });
});

state.email = userData.value.email;
state.primer_nombre = userData.value.primer_nombre;
state.segundo_nombre = userData.value.segundo_nombre;
state.primer_apellido = userData.value.primer_apellido;
state.segundo_apellido = userData.value.segundo_apellido;

async function onSubmit(event: FormSubmitEvent<InferType<typeof schema>>) {
  try {
    const client = useSanctumClient();

    const { data, error, refresh } = await useAsyncData('updateUser', () =>
        client(`/api/users/${parametro}`, {
          method: 'PUT',
          body: state,
        })
    );

    toast.add({
      title: 'Usuario Actualizado!',
      description: data.value.message,
      icon: 'mdi:account-check',
    });

    refresh();
    navigateTo('/users');
  } catch (e) {
    toast.add({
      title: 'Error al actualizar el usuario!',
      description: e.message,
      icon: 'mdi:alert-circle',
    });
  }
}

// Función para ejecutar el submit programáticamente
function submitForm() {
  if (formRef.value) {
    formRef.value.submit();
  }
}

const active = useState('activeItem');
active.value = 'users';
</script>

<template>
  <mi-card borderColor="#e74c3c">
    <template #header>
      <h1>Editar el usuario: {{ state.primer_nombre + " " + state.primer_apellido }}</h1>
    </template>

    <UForm
        ref="formRef"
    :schema="schema"
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

    <UFormGroup label="Nueva Contraseña" name="password">
      <UInput v-model="state.password" type="password"/>
    </UFormGroup>

    <UFormGroup label="Confirmar Nueva Contraseña" name="password_confirmation">
      <UInput v-model="state.password_confirmation" type="password"/>
    </UFormGroup>
    </UForm>

    <template #footer>
      <div>
        <UButton type="button" color="red" variant="soft" label="Regresar" @click="navigateTo('/users')" />
        <UButton type="button" label="Guardar" @click="submitForm" /> <!-- Botón que llama al submit programáticamente -->
      </div>
    </template>
  </mi-card>
</template>

<style scoped></style>
