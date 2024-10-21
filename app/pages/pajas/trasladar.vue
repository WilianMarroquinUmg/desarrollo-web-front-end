<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";
import Multiselect from 'vue-multiselect'
import SelectorDirecciones from "~/components/personalized/SelectorDirecciones.vue";

const {notifyError, notifySuccess} = useToastNotifications()

const cliente = useSanctumRequest()
import {ref} from 'vue'

const trasladoPajaAgua = ref({
  dueñoActual: '',
  dueñoNuevo: '',
  direccionActualPaja: '',
  nuevaDireccionPaja: '',
  tipoAdquisicion: '',
  observaciones: ''
})


const residentes = ref([])
const getResidentes = async () => {
  try {

    let res = await cliente.get('api/residentes')

    residentes.value = res.data

  } catch (error) {

    notifyError(error.meesage)

  }
}

getResidentes()

const tiposAdquisicion = ref([])
const getTiposAdquisicion = async () => {
  try {

    let res = await cliente.get('api/tipos-adquisicion')

    tiposAdquisicion.value = res.data

    console.log(tiposAdquisicion.value)

  } catch (error) {

    notifyError(error.meesage)

  }
}

getTiposAdquisicion()




</script>

<template>

  <mi-card>

    <template #header>

      <h1>Traslado Paja de Agua</h1>

    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div class="flex flex-col space-y-2">

              <label for="Dueño">Dueño Actual:</label>

              <multiselect v-model="trasladoPajaAgua.dueñoActual"
                           :options="residentes"
                           label="dpi_y_nombre"
              ></multiselect>

            </div>

            <div class="flex flex-col space-y-2">

              <label for="Dueño">Dueño Nuevo:</label>

              <multiselect v-model="trasladoPajaAgua.dueñoNuevo"
                           :options="residentes">

              </multiselect>

            </div>

            <div class="flex flex-col space-y-2">

              <label for="Dueño">Direccion Actual Paja:</label>

              <selector-direcciones name="direccion"
                                    v-model="trasladoPajaAgua.direccionActualPaja"
              />

            </div>

            <div class="flex flex-col space-y-2">

              <label for="Dueño">Nueva Dirección Paja:</label>

              <selector-direcciones name="direccion"
                                    v-model="trasladoPajaAgua.nuevaDireccionPaja"
              />


            </div>

            <div class="flex flex-col space-y-2">

              <label for="Dueño">Tipo Adquisición:</label>

<!--              <multiselect v-model="trasladoPajaAgua.tipoAdquisicion"-->
<!--                           :options="tiposAdquisicion">-->

<!--              </multiselect>-->

            </div>

      <!--      <div class="flex flex-col space-y-2">-->

      <!--        <label for="Dueño">Observaciones:</label>-->

      <!--        <UTextarea />-->

      <!--      </div>-->

    </div>


  </mi-card>


</template>

<style scoped>

</style>
