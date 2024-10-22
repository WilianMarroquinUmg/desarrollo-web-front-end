<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script lang="ts" setup>
import {reactive, ref, toRefs} from 'vue';
import { object, string, InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import MiCard from "~/components/personalized/MiCard.vue";
import InputDate from "~/components/personalized/InputDate.vue";
import SelectorDirecciones from "~/components/personalized/SelectorDirecciones.vue";
import multiselect from 'vue-multiselect';
const {notifySuccess, notifyError} = useToastNotifications();

const schema = object({ primer_nombre: string().required("Este campo es requerido"),
segundo_nombre: string().required("Este campo es requerido"),
tercer_nombre: string().nullable(),
primer_apellido: string().required("Este campo es requerido"),
segundo_apellido: string().required("Este campo es requerido"),
apellido_casada: string().nullable(),
dpi: string().required("Este campo es requerido").min(13, "El DPI debe tener 13 dígitos"),
fecha_nacimiento: string().required("Este campo es requerido"),
direccion_id: object().required("Este campo es requerido"),
sexo: object().required("Este campo es requerido") }) ;

const state = reactive( { primer_nombre: undefined,
segundo_nombre: undefined,
tercer_nombre: undefined,
primer_apellido: undefined,
segundo_apellido: undefined,
apellido_casada: undefined,
dpi: undefined,
fecha_nacimiento: undefined,
direccion_id: undefined,
sexo: undefined }  );

const cliente = useSanctumRequest();

const formRef = ref();
const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {

  try {

    state.direccion_id = state.direccion_id.id;
    state.sexo = state.sexo.value;

    let res = await cliente.post('api/residentes', state);

    notifySuccess('Residente Cread@', res.data.message);

    navigateTo('/residentes');

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
    "label": "Primer Nombre",
    "type": "text",
    "key": "primer_nombre"
  },
  {
    "label": "Segundo Nombre",
    "type": "text",
    "key": "segundo_nombre"
  },
  {
    "label": "Tercer Nombre",
    "type": "text",
    "key": "tercer_nombre"
  },
  {
    "label": "Primer Apellido",
    "type": "text",
    "key": "primer_apellido"
  },
  {
    "label": "Segundo Apellido",
    "type": "text",
    "key": "segundo_apellido"
  },
  {
    "label": "Apellido Casada",
    "type": "text",
    "key": "apellido_casada"
  },
  {
    "label": "Dpi",
    "type": "number",
    "key": "dpi"
  },
  {
    "label": "Fecha Nacimiento",
    "type": "date",
    "key": "fecha_nacimiento"
  },
  {
    "label": "Direccion",
    "type": "select",
    "key": "direccion_id"
  },
  {
    "label": "Sexo",
    "type": "select",
    "key": "sexo"
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
const opciones = ref([
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' }
]);
//
// onMounted(async () => {
//   opciones.value = await obtenerOpciones();
// });


const active = useState('activeItem');
active.value = 'Residente';

</script>

<template>
  <mi-card>

    <template #header>
      <h1>Crear Residente</h1>
    </template>

    <template #text>
      <p>Ingresa los datos a continuación para crear un nuevo residente.</p>
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


              <selector-direcciones v-if="field.type == 'select' && field.key == 'direccion_id'"
                                    v-model="state[field.key]"
              />


              <multiselect v-if="field.type == 'select' && field.key == 'sexo'"
                           v-model="state[field.key]"
                           :options="opciones"
                           label="label"
              />



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
                 @click="navigateTo('/residentes')"
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

