<script setup lang="ts">
import MiCard from '~/components/personalized/MiCard.vue';
import { object, string, InferType } from 'yup';
import { ref, reactive } from 'vue';
import type { FormSubmitEvent } from '#ui/types';
const {notifySuccess, notifyError} = useToastNotifications();

const route = useRoute();
const id = route.params.id;

const schema = {{ validacionesCreate }}

const state = reactive({{ camposCreate }});

const formRef = ref();

let cliente = useSanctumRequest();

const getItem = async () => {

  try {

    let res = await cliente.get(`{{ url }}/${id}`);

    let objetKeys = Object.keys(state);

    objetKeys.forEach(key => {

      console.log(res.data[key])

      state[key] = res.data[key];

    });


  } catch (e) {

    notifyError('Error', e.message);

  }

};

getItem();

const formatearCampoLabel = (campo) => {

  let campoFormateado = campo.replace(/([A-Z])/g, ' $1').trim();

  return campoFormateado.charAt(0).toUpperCase() + campoFormateado.slice(1);

}

async function onSubmit(event: FormSubmitEvent<InferType<typeof schema>>) {

  try {

    let res = await cliente.put(`{{ url }}/${id}`, state);

    notifySuccess('{{ model }} Actualizad@', res.data.message);

    navigateTo('/{{ directory }}');

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
active.value = '{{ model }}';
</script>

<template>
  <mi-card borderColor="#e74c3c">
    <template #header>

    </template>

    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
           ref="formRef"
    >

      <UFormGroup
          v-for=" (field, index) in Object.keys(state)"
          :key="index"
          :label="formatearCampoLabel(field) + ':'"
          :name="field"
      >
        <UInput v-model="state[field]" />
      </UFormGroup>
    </UForm>

    <template #footer>
      <div>
        <UButton type="button" color="red" variant="soft" label="Regresar" @click="navigateTo('/{{ directory }}')" />
        <UButton type="button" label="Guardar" @click="submitForm" />
      </div>
    </template>


  </mi-card>
</template>

<style scoped></style>
