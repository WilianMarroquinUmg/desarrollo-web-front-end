<template>
  <canvas ref="myPieChart"></canvas>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

// Registra todos los componentes de Chart.js
Chart.register(...registerables);

export default {
  setup() {
    const myPieChart = ref(null);

    const renderChart = () => {
      const ctx = myPieChart.value.getContext('2d');
      const myPieChartInstance = new Chart(ctx, {
        type: 'pie', // Tipo de gráfico de pastel
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'My Pie Chart',
            data: [12, 19, 3, 5, 2, 3], // Datos para cada sector
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
    };

    // Ejecutar renderChart cuando el componente se monta
    onMounted(() => {
      renderChart();
    });

    return {
      myPieChart
    };
  }
}
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin: 0 auto;
}
</style>
