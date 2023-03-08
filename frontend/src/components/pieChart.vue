<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
mounted() {
    new Chart(this.$refs.clientZipcode, {
      type: 'pie',
      data: {
        labels: this.label,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: ['powderblue','lightgreen','pink','orange','purple']
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        },
      }
    })
  },
}
</script>
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="clientZipcode"></canvas>
  </div>
</template>
