<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

const toast = useToast();
export default defineComponent({
  name: 'FormComponent',
  data() {
    return {
      schema: object({
        primer_nombre: string().required('Required'),
        segundo_nombre: string().required('Required'),
        primer_apellido: string().required('Required'),
        segundo_apellido: string().required('Required'),
        email: string().email('Invalid email').required('Required'),
        password: string().min(8, 'Must be at least 8 characters').required('Required'),
        password_confirmation: string().required('Required')
      }),
      state: reactive({
        email: undefined,
        password: undefined,
        primer_nombre: undefined,
        segundo_nombre: undefined,
        primer_apellido: undefined,
        segundo_apellido: undefined,
        password_confirmation: undefined

      })
    };
  },
  methods: {
    async onSubmit(event: FormSubmitEvent<InferType<typeof this.schema>>) {

      try {
        const client = useSanctumClient();

        const { data, error, refresh } = await useAsyncData('createUser', () =>
            client('/api/users', {
              method: 'POST',
              body: this.state
            })
        );

        if (error.value) {
          throw new Error(error.value.data.message);
        }

        toast.add({
          title: "Usuario Creado! ",
          description: data.value.message,
          icon: 'mdi:account-check',
        });

        refresh();

        this.$router.push('/users');

      } catch (e) {

        toast.add({
          title: "Error al intentar crear el usuario",
          description: e.message,
          icon: 'mdi:account-remove',
          color: 'red'
        });

      }

    }
  }
});
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
