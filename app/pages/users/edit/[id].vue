<script setup lang="ts">
import MiCard from '~/components/personalized/MiCard.vue';
import { object, string, InferType } from 'yup';
import { ref, reactive } from 'vue';
import type { FormSubmitEvent } from '#ui/types';
const {notifySuccess, notifyError} = useToastNotifications();

const route = useRoute();
const id = route.params.id;

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

const formRef = ref();

let cliente = useSanctumRequest();

const getItem = async () => {

  try {

    let res = await cliente.get(`/api/users/${id}`);

    state.email = res.data.email;
    state.primer_nombre = res.data.primer_nombre;
    state.segundo_nombre = res.data.segundo_nombre;
    state.primer_apellido = res.data.primer_apellido;
    state.segundo_apellido = res.data.segundo_apellido;

  } catch (e) {

    notifyError('Error', e.message);

  }

};

getItem();

async function onSubmit(event: FormSubmitEvent<InferType<typeof schema>>) {

  try {

    let res = await cliente.put(`/api/users/${id}`, state);

    notifySuccess('Usuario Actualizado', res.message);

    navigateTo('/users');

  } catch (e) {

    notifyError('Error', e.message);

  }

}

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
        <UButton type="button" label="Guardar" @click="submitForm" />
      </div>
    </template>
  </mi-card>
</template>

<style scoped></style>
