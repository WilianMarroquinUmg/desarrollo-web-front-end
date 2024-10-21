<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import MiCard from "~/components/personalized/MiCard.vue";
import InputDate from "~/components/personalized/InputDate.vue";
const {notifySuccess, notifyError} = useToastNotifications();

const schema = object({ nombre: string().required("Este campo es requerido") }) ;

const state = reactive( { nombre: undefined }  );

const cliente = useSanctumRequest();

const formRef = ref();
const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {

  try {

    let res = await cliente.post('api/direcciones', state);

    notifySuccess('Direccion Cread@', res.data.message);

    navigateTo('/direcciones');

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

const valoresInputFormulario1 = ref( [
  {
    "label": "Nombre",
    "type": "text",
    "key": "nombre"
  }
] );

// const obtenerOpciones = async () => {
//
//   try {
//     let res = await cliente.get('api/direcciones');
//     return res.data;
//
//   } catch (e) {
//     notifyError('Error', e.message);
//   }
//
// }
//
// const opciones = ref([]);
//
// onMounted(async () => {
//   opciones.value = await obtenerOpciones();
// });


const active = useState('activeItem');
active.value = 'Direccion';

</script>

<template>
  <mi-card>

    <template #header>
      <h1>Crear Dirección</h1>
    </template>

    <template #text>
      <p>Ingresa la ubicación de la dirección.</p>
    </template>


    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
           ref="formRef"
    >

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <template v-for=" (field, index) in valoresInputFormulario1"
                  :key="index"
        >

          <div class="flex flex-col space-y-2">

            <UFormGroup
                :label="field.label + ':'"
                :name="field.key"
            >

              <UInput v-if="field.type == 'text' || field.type == 'number' || field.type == 'date'"
                      v-model="state[field.key]"
                      :type="field.type"
              />

              <UCheckbox v-if="field.type == 'checkbox'"
                         v-model="state[field.key]"
                         name="notifications"
              />


<!--              ingresar de forma manual cuando sea selector-->

<!--              <USelect v-if="field.type == 'select'"-->
<!--                       v-model="state[field.key]"-->
<!--                       :options="opciones"-->
<!--                       option-attribute="nombre"-->
<!--                       placeholder="Seleccione una opción"-->
<!--                       value-attribute="id"-->
<!--              />-->


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
                 @click="navigateTo('/direcciones')"
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

