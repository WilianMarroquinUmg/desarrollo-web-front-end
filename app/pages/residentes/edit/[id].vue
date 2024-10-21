<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script setup lang="ts">
import MiCard from '~/components/personalized/MiCard.vue';
import {object, string, InferType} from 'yup';
import {ref, reactive, onMounted} from 'vue';
import type {FormSubmitEvent} from '#ui/types';
import InputDate from "~/components/personalized/InputDate.vue";
import SelectorDirecciones from "~/components/personalized/SelectorDirecciones.vue";
import multiselect from 'vue-multiselect';

const {notifySuccess, notifyError} = useToastNotifications();

const route = useRoute();
const id = route.params.id;

const schema = object({
  primer_nombre: string().required("Este campo es requerido"),
  segundo_nombre: string().required("Este campo es requerido"),
  tercer_nombre: string().nullable(),
  primer_apellido: string().required("Este campo es requerido"),
  segundo_apellido: string().required("Este campo es requerido"),
  apellido_casada: string().nullable(),
  dpi: string().required("Este campo es requerido").min(13, "El DPI debe tener 13 dígitos"),
  fecha_nacimiento: string().required("Este campo es requerido"),
  direccion_id: object().required("Este campo es requerido"),
  sexo: object().required("Este campo es requerido")
})

const state = reactive({
  primer_nombre: undefined,
  segundo_nombre: undefined,
  tercer_nombre: undefined,
  primer_apellido: undefined,
  segundo_apellido: undefined,
  apellido_casada: undefined,
  dpi: undefined,
  fecha_nacimiento: undefined,
  direccion_id: undefined,
  sexo: undefined
});

const formRef = ref();

let cliente = useSanctumRequest();

const getItem = async () => {

  try {

    let res = await cliente.get(`api/residentes/${id}`);

    let objetKeys = Object.keys(state);

    objetKeys.forEach(key => {

      if (key && !isNaN(Date.parse(key))) {
        const date = new Date(key);

        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        state[key] = formattedDate;

      } else {

        if (key == 'direccion_id') {

          state[key] = res.data.direccion

        } else if(key == "sexo"){
          state[key] = {
            value: res.data.sexo,
            label: res.data.sexo == 'M' ? 'Masculino' : 'Femenino'
          }

        } else{

          state[key] = res.data[key];

        }

      }

    });


  } catch (e) {

    notifyError('Error', e.message);

  }

};

getItem();

const formatearCampoLabel = (str) => {

  return str
      .split('_')
      .filter(word => word.toLowerCase() !== 'id')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

async function onSubmit(event: FormSubmitEvent<InferType<typeof schema>>) {

  try {

    state.direccion_id = state.direccion_id.id;
    state.sexo = state.sexo.value;

    let res = await cliente.put(`api/residentes/${id}`, state);

    notifySuccess('Residente Actualizad@', res.data.message);

    navigateTo('/residentes');

  } catch (e) {

    notifyError('Error', e.message);

  }

}

function submitForm() {
  if (formRef.value) {
    formRef.value.submit();
  }
}

const valoresInputFormulario1 = ref([
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
    "type": "text",
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
]);

const opciones = ref([
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' }
]);

const active = useState('activeItem');
active.value = 'Residente';
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
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <template v-for=" (field, index) in valoresInputFormulario1"
                  :key="index">

          <div>

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


          </div>

        </template>
      </div>


    </UForm>

    <template #footer>
      <div>
        <UButton type="button"
                 color="red"
                 icon="i-heroicons-arrow-left-end-on-rectangle"
                 variant="solid"
                 label="Regresar"
                 @click="navigateTo('/residentes')"
                 class="mr-1"
        />
        <UButton type="button"
                 label="Guardar"
                 @click="submitForm"
                 icon="i-heroicons-bookmark-square"
        />
      </div>
    </template>


  </mi-card>
</template>

<style scoped></style>
