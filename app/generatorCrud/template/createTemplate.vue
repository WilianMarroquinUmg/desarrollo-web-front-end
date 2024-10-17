<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const {notifySuccess, notifyError} = useToastNotifications();

const schema = {{ validacionesCreate }} ;

const state = reactive( {{ camposCreate }}  );

const fiels = Object.keys(state);

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

const active = useState('activeItem');
active.value = '{{ model }}';

</script>

<template>
  <UCard>
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
  </UCard>
</template>
