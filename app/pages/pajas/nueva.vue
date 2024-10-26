<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";
import Multiselect from "vue-multiselect";
import {reactive, ref,} from "vue";
import {InferType, object, string} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import SelectorDirecciones from "~/components/personalized/SelectorDirecciones.vue";

const active = useState('activeItem');
active.value = 'PajaAgua';

const cliente = useSanctumRequest();

const {notifyError, notifySuccess} = useToastNotifications();

const residentes = ref([]);
const tiposAdquisicion = ref([]);

const schema = object({
  residente_id: object().required("Este campo es requerido"),
  tipo_transaccion_id: object().required("Este campo es requerido"),
  direccion_id: object().required("Este campo es requerido"),
  observaciones: string().required("Este campo es requerido"),
});

const state = reactive({
  residente_id: undefined,
  tipo_transaccion_id: undefined,
  direccion_id: undefined,
  observaciones:  undefined
});

const formRef = ref();

const realizarSubmit = () => {
  formRef.value?.submit();
};

const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {

  try {


    state.residente_id = state.residente_id.id;
    state.tipo_transaccion_id = state.tipo_transaccion_id.id;
    state.direccion_id = state.direccion_id.id;

    let res = await cliente.post('api/paja-aguas', state);

    notifySuccess('Paja creada', res.data.message);

    navigateTo('/pajas')


  } catch (error) {

    notifyError(error.message);

  }

};


const getResidentes = async () => {
  try {

    let res = await cliente.get('api/residentes');

    residentes.value = res.data;

  } catch (error) {

    notifyError(error.message);

  }

};

getResidentes();

const getTipoAdquisicion = async () => {
  try {

    let res = await cliente.get('api/tipos-adquisicions');

    tiposAdquisicion.value = res.data;

  } catch (error) {

    notifyError(error.message);

  }

};
getTipoAdquisicion();





</script>

<template>

  <mi-card>
    <template #header>
      <h1>Crear nueva paja</h1>
    </template>

    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
           ref="formRef"
    >

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div class="flex flex-col space-y-2">


          <UFormGroup
              label="Residente:"
              name="residente_id"
          >
            <multiselect
                v-model="state.residente_id"
                :options="residentes"
                label="dpi_y_nombre"
                track-by="id"
                placeholder="Seleccione un residente"
            ></multiselect>
          </UFormGroup>

          <UFormGroup
              label="Dirección:"
              name="direccion_id"
          >
            <selector-direcciones v-model="state.direccion_id" name="direccion"
            ></selector-direcciones>

          </UFormGroup>


        </div>

        <div class="flex flex-col space-y-2">
          <UFormGroup
              label="Tipo Adquisición:"
              name="tipo_transaccion_id"
          >
            <multiselect
                v-model="state.tipo_transaccion_id"
                :options="tiposAdquisicion"
                label="nombre"
                track-by="id"
                placeholder="Seleccione un tipo de adquisición"
            ></multiselect>
          </UFormGroup>

          <UFormGroup
              label="Observaciones"
              name="observaciones"
          >
            <UTextarea
                v-model="state.observaciones"
                placeholder="Ingrese observaciones"
            />
          </UFormGroup>

        </div>
      </div>


    </UForm>


    <template #footer>
      <UButton color="gray"
               class="mr-2"
               label="Regresar"
               to="/pajas"
      />

      <UButton color="green"
               label="Guardar"
               @click="realizarSubmit"
      />


    </template>


  </mi-card>


</template>

<style scoped>

</style>
