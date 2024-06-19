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
      borderWidth: 0
    }
  ]
}))

const options = computed(() => ({
  plugins: {
    responsive: true,
    legend: false
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
