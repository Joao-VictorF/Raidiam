<script setup lang="ts">
import { BarChart, useBarChart } from 'vue-chart-3'

interface Props {
  dataValues: number[]
  dataLabels: string[]
  dataColors?: string[]
}

const props = defineProps<Props>()
const chartData = computed(() => ({
  labels: props.dataLabels,
  datasets: [
    {
      data: props.dataValues,
      borderWidth: 0,
      backgroundColor: props.dataColors
    }
  ]
}))

const options = computed(() => ({
  plugins: {
    responsive: true,
    legend: false,
    datalabels: {
      color: '#2e2e2e',
      font: {
        size: 16,
        weight: '500'
      }
    }
  }
}))

const { barChartProps } = useBarChart({
  options,
  chartData
})
</script>

<template>
  <BarChart v-bind="barChartProps" />
</template>
