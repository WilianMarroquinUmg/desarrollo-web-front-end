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
      state[key] = res.data[key];
    });


  } catch (e) {

    notifyError('Error', e.message);

  }

};

getItem();

const fiels = Object.keys( {{ fields }} );

async function onSubmit(event: FormSubmitEvent<InferType<typeof schema>>) {

  try {

    let res = await cliente.put(`{{ url }}/${id}`, state);

    notifySuccess('{{ model }} Cread@', res.data.message);

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
    >

      <UFormGroup
          v-for=" (field, index) in fiels"
          :key="index"
          :label="field"
          :name="field"
      >
        <UInput v-model="state[field]" />
      </UFormGroup>


      <div class="buttons">
        <UButton type="submit">
          Submit
        </UButton>
      </div>
    </UForm>

  </mi-card>
</template>

<style scoped></style>
