<script setup lang="ts">
import MiCard from '~/components/personalized/MiCard.vue';
const {notifySuccess, notifyError} = useToastNotifications();

const route = useRoute();

const item = ref( [
  {
    "label": "Primer Nombre",
    "field": "primer_nombre"
  },
  {
    "label": "Segundo Nombre",
    "field": "segundo_nombre"
  },
  {
    "label": "Tercer Nombre",
    "field": "tercer_nombre"
  },
  {
    "label": "Primer Apellido",
    "field": "primer_apellido"
  },
  {
    "label": "Segundo Apellido",
    "field": "segundo_apellido"
  },
  {
    "label": "Apellido Casada",
    "field": "apellido_casada"
  },
  {
    "label": "Dpi",
    "field": "dpi"
  },
  {
    "label": "Fecha Nacimiento",
    "field": "fecha_nacimiento"
  },
  {
    "label": "Direccion",
    "field": "direccion_id"
  },
  {
    "label": "Sexo",
    "field": "sexo"
  }
] );

let cliente = useSanctumRequest();

const getItem = async () => {

  try {

    const id = route.params.id;

    let res = await cliente.get(`api/residentes/${id}`);

    let data = {
      primer_nombre : res.data.primer_nombre,
      segundo_nombre : res.data.segundo_nombre,
      tercer_nombre : res.data.tercer_nombre,
      primer_apellido : res.data.primer_apellido,
      segundo_apellido : res.data.segundo_apellido,
      apellido_casada : res.data.apellido_casada,
      dpi : res.data.dpi,
      fecha_nacimiento : res.data.fecha_nacimiento,
      direccion_id : res.data.direccion.nombre,
      sexo : res.data.sexo === 'M' ? 'Masculino' : 'Femenino'
    }

    item.value = data;

  } catch (e) {

    notifyError('Error', e.message);

  }

};

const fiels = Object.keys( [
  {
    "label": "Primer Nombre",
    "field": "primer_nombre"
  },
  {
    "label": "Segundo Nombre",
    "field": "segundo_nombre"
  },
  {
    "label": "Tercer Nombre",
    "field": "tercer_nombre"
  },
  {
    "label": "Primer Apellido",
    "field": "primer_apellido"
  },
  {
    "label": "Segundo Apellido",
    "field": "segundo_apellido"
  },
  {
    "label": "Apellido Casada",
    "field": "apellido_casada"
  },
  {
    "label": "Dpi",
    "field": "dpi"
  },
  {
    "label": "Fecha Nacimiento",
    "field": "fecha_nacimiento"
  },
  {
    "label": "Direccion",
    "field": "direccion_id"
  },
  {
    "label": "Sexo",
    "field": "sexo"
  }
] );

getItem();

const formatString = (str) => {
  return str
      .split('_')
      .filter(word => word.toLowerCase() !== 'id')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}


const active = useState('activeItem');
active.value = 'Residente';

</script>


<template>

  <mi-card borderColor="#e74c3c">

    <template #header>
      <h1>Residente</h1>
    </template>

    <template #text>
      <p>Datos del Residente.</p>
    </template>

    <div class="grid grid-cols-2 gap-4">

      <template v-for="field in Object.keys(item)">

        <div class="flex flex-col space-y-2">

          <label class="text-sm font-semibold text-gray-600"
                 v-text="formatString(field)+ ':'"
          ></label>

          <p class="text-sm text-gray-800"
             v-text="item[field]"
          ></p>

        </div>

      </template>
    </div>

    <template #footer>
      <div>
        <UButton type="button"
                 color="red"
                 icon="i-heroicons-arrow-left-end-on-rectangle"
                 variant="solid"
                 label="Regresar"
                 @click="navigateTo('/residentes')"
        />
      </div>
    </template>
  </mi-card>

</template>

<style scoped></style>
