<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const {notifySuccess, notifyError} = useToastNotifications();

const schema = {{ validacionesCreate }} ;

const state = reactive( {{ camposCreate }}  );

const fiels = Object.keys(state);

const formRef = ref();
const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {

  try {

    const client = useSanctumRequest();

    let res = await client.post('{{ url }}', state);

    notifySuccess('{{ model }} Cread@', res.data.message);

    navigateTo('/{{ directory }}');

  } catch (e) {

    notifyError('Error', e.message);

  }

};

const formatearCampoLabel = (campo) => {

  let campoFormateado = campo.replace(/([A-Z])/g, ' $1').trim();

  return campoFormateado.charAt(0).toUpperCase() + campoFormateado.slice(1);

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
  <UCard>
    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
           ref="formRef"
    >

      <UFormGroup
          v-for=" (field, index) in fiels"
          :key="index"
          :label="formatearCampoLabel(field)+':'"
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

  </UCard>
</template>























