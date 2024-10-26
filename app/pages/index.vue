<script setup lang="ts">
import MiCard from "~/components/personalized/MiCard.vue";
import {onMounted, ref} from "vue";

definePageMeta({
  title: 'Dashboard',
  layout: 'default',
});

const active = useState('activeItem');
active.value = 'home';

const cliente = useSanctumRequest();
const user = useSanctumUser();
const {notifyError} = useToastNotifications();

import {Chart, registerables} from 'chart.js';

// Registra todos los componentes de Chart.js
Chart.register(...registerables);

const myPieChart = ref<HTMLCanvasElement | null>(null);
const dataPastel = ref<number[]>([]); // Asegúrate de que esto sea un array de números

const getDataGraficaPastel = async () => {
  try {
    const res = await cliente.get('api/paja-aguas/get/grafica/pastel');
    dataPastel.value = res.data;
    renderChart();
  } catch (e) {
    notifyError('Error', e.message);
  }
};

const transaccionesRecientes = ref([]);

const getTransaccionesRecientes = async () => {
  try {
    const res = await cliente.get('api/paja-aguas/get/transacciones/recientes');
    transaccionesRecientes.value = res.data;
    console.log(transaccionesRecientes.value)
  } catch (e) {
    notifyError('Error', e.message);
  }
};

const renderChart = () => {
  if (myPieChart.value) {
    const ctx = myPieChart.value.getContext('2d');
    if (ctx) {
      const myPieChartInstance = new Chart(ctx, {
        type: 'pie', // Tipo de gráfico de pastel
        data: {
          labels: ['Compra', 'Herencia', 'Donación', 'Adquisición'],
          datasets: [{
            label: 'My Pie Chart',
            data: dataPastel.value, // Asegúrate de usar dataPastel.value
            backgroundColor: [
              'rgba(0, 0, 80, 0.8)',
              'rgba(224, 248, 49, 0.8)',
              'rgba(255, 0, 40, 1)',
              'rgba(0, 194, 0, 1)',
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`; // Personaliza el texto del tooltip
                }
              }
            }
          }
        }
      });
    }
  }
};

onMounted(() => {
  getDataGraficaPastel();
  getTransaccionesRecientes();
});

</script>
<template>
  <mi-card>
    <template #header>
      <h1>Buenas señor administrador {{ user?.nombre_completo }}</h1>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> <!-- Cambia aquí a grid-cols-1 para móviles -->

      <div class="flex flex-col space-y-2">
        <mi-card>
          <template #header>
            <h1>Detalles Forma Adquisición</h1>
          </template>

          <template #text>
            <p>Detalles de las formas en que más se adquieren las pajas de agua.</p>
          </template>

          <canvas ref="myPieChart"></canvas>
        </mi-card>
      </div>

      <div class="flex flex-col space-y-2">
        <mi-card>
          <template #header>
            <h1>Transacciones Recientes</h1>
          </template>

          <template #text>
            <p>Listado de las últimas 5 transacciones recientes.</p>
          </template>

          <div>
            <ul style="list-style-type: none; padding: 0;">
              <li
                  v-for="transaccion in transaccionesRecientes"
                  :key="transaccion.id"
                  style="border-bottom: 1px solid #ccc; padding: 10px; margin-bottom: 5px; display: flex; align-items: center; background: aliceblue"
              >
                <div style="flex-grow: 1;">
                  <p style="font-size: 14px; margin: 0; color: #333;">
                    <strong>El residente {{ transaccion.residente.nombre_completo }}</strong> adquirió por medio de
                    "<em>{{ transaccion.transaccion.nombre }}</em>"
                  </p>
                </div>
                <span style="font-size: 12px; color: #999;">{{
                    new Date(transaccion.created_at).toLocaleDateString()
                  }}</span>
              </li>
            </ul>
          </div>
        </mi-card>
      </div>

    </div>
  </mi-card>
</template>
