<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import MiCard from "~/components/personalized/MiCard.vue";
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

const formatearCampoLabel = (str) => {

  return str
      .split('_')
      .filter(word => word.toLowerCase() !== 'id')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

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
  <mi-card>
    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
           ref="formRef"
    >

      <div class="grid grid-cols-2 gap-4">

        <template v-for=" (field, index) in fiels"
                  :key="index"
        >

          <div class="flex flex-col space-y-2">

            <UFormGroup

                :label="formatearCampoLabel(field)+':'"
                :name="field"
            >
              <UInput v-model="state[field]" />
            </UFormGroup>

          </div>

        </template>
      </div>



    </UForm>

    <template #footer>
      <div>
        <UButton type="button"
                 color="red"
                 variant="solid"
                 label="Regresar"
                 icon="i-heroicons-arrow-left-end-on-rectangle"
                 @click="navigateTo('/{{ directory }}')"
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

