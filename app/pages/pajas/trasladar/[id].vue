<style src="../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";
import Multiselect from 'vue-multiselect'
import SelectorDirecciones from "~/components/personalized/SelectorDirecciones.vue";
import {ref, onMounted} from 'vue'
import {InferType, object, string} from "yup";
import type {FormSubmitEvent} from "#ui/types";

const {notifyError, notifySuccess} = useToastNotifications()

const route = useRoute();

const resienteActual = route.params.id

const cliente = useSanctumRequest()

const schema = object({
  paja_agua_id: object().required("Este campo es requerido"),
  nuevo_residente_id: object().required("Este campo es requerido"),
  direccion_id: object().required("Este campo es requerido"),
  tipo_transaccion_id: object().required("Este campo es requerido"),
  observaciones: string().nullable()
})

const active = useState('activeItem');
active.value = 'PajaAgua';

const state = reactive({
  paja_agua_id: undefined,
  nuevo_residente_id: undefined,
  direccion_id: undefined,
  tipo_transaccion_id: undefined,
  observaciones: undefined
})

const residentes = ref([])
const getResidentes = async () => {
  try {

    let res = await cliente.get('api/residentes')

    residentes.value = res.data.filter((residente: any) => residente.id != resienteActual)

  } catch (error) {

    notifyError(error.meesage)

  }
}

getResidentes()

const pajasAgua = ref([])
const getPajasAgua = async () => {
  try {

    let res = await cliente.get('api/paja-aguas/from/residente/' + resienteActual)

    pajasAgua.value = res.data


  } catch (error) {

    notifyError(error.message)

  }
}

getPajasAgua()


const tiposAdquisicion = ref([])
const getTiposAdquisicion = async () => {
  try {

    let res = await cliente.get('api/tipos-adquisicions')

    tiposAdquisicion.value = res.data

  } catch (error) {

    notifyError(error.meesage)

  }
}

getTiposAdquisicion()

const onSubmit = async (event: FormSubmitEvent<InferType<typeof schema>>) => {

  try {

    state.direccion_id = state.direccion_id.id
    state.tipo_transaccion_id = state.tipo_transaccion_id.id
    state.paja_agua_id = state.paja_agua_id.id
    state.nuevo_residente_id = state.nuevo_residente_id.id

    console.log(state)

    let res = await cliente.post('api/traslados-paja-agua', state)

    notifySuccess('Traslado de Paja de Agua Creado', res.data.message)

    navigateTo('/pajas')

  } catch (e) {

    console.log(e.message)

    notifyError('Error', e.message)

  }


}

const residenteDuenoActual = ref('')
const getResidenteActual = async () => {
  try {

    let res = await cliente.get('api/residentes/' + resienteActual)

    residenteDuenoActual.value = res.data

  } catch (error) {

    notifyError(error.meesage)

  }

}

getResidenteActual()

const formRef = ref();

function submitForm() {
  if (formRef.value) {
    formRef.value.submit();
  }
}

</script>

<template>

  <mi-card>

    <template #header>
      <h1>Trasladar Paja de Agua</h1>
    </template>

    <template #text>
      <p>Se trasladara la paja de agua del señor {{residenteDuenoActual.nombre_completo}}.</p>
    </template>

    <p class="mb-4"> </p>

    <UForm :schema="schema"
           :state="state"
           class="space-y-4"
           @submit="onSubmit"
           ref="formRef"
    >

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div class="flex flex-col space-y-2">

          <UFormGroup label="Paja Agua:"
                      name="paja_agua_id"
          >
            <multiselect v-model="state.paja_agua_id"
                         :options="pajasAgua"
                         label="correlativo_direccion"
            ></multiselect>

          </UFormGroup>

        </div>

        <div class="flex flex-col space-y-2">

          <UFormGroup label="Dueño Nuevo:"
                      name="nuevo_residente_id"
          >
            <multiselect v-model="state.nuevo_residente_id"
                         :options="residentes"
                         label="dpi_y_nombre"
            ></multiselect>

          </UFormGroup>

        </div>

<!--        <div class="flex flex-col space-y-2">-->

<!--          <UFormGroup label="Dirección Actual Paja:"-->
<!--                      name="direccionActualPaja"-->
<!--          >-->
<!--            <selector-direcciones name="direccion"-->
<!--                                  v-model="state.direccionActualPaja"-->
<!--            />-->

<!--          </UFormGroup>-->

<!--        </div>-->

        <div class="flex flex-col space-y-2">

          <UFormGroup label="Nueva Dirección Paja:"
                      name="direccion_id"
          >
            <selector-direcciones name="direccion"
                                  v-model="state.direccion_id"
            />
          </UFormGroup>


        </div>

        <div class="flex flex-col space-y-2">


          <UFormGroup label="Tipo Adquisición:"
                      name="tipo_transaccion_id"
          >
            <multiselect v-model="state.tipo_transaccion_id"
                         :options="tiposAdquisicion"
                         label="nombre"
            ></multiselect>

          </UFormGroup>


        </div>

        <div class="flex flex-col space-y-2">

          <UFormGroup label="Observaciones:"
                      name="observaciones"
          >
            <UTextarea v-model="state.observaciones"
            />
          </UFormGroup>

        </div>

      </div>

    </UForm>

    <template #footer>
      <div>
        <UButton type="button"
                 color="red"
                 variant="solid"
                 label="Regresar"
                 icon="i-heroicons-arrow-left-end-on-rectangle"
                 to="/pajas"
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

<style scoped>

</style>
