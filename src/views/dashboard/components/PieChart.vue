<script setup lang="ts">
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import ChartDataLabels from 'chartjs-plugin-datalabels'

interface Props {
  title?: string
  dataValues: Array
  dataLabels: string[]
  dataColors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  dataColors: () => ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
})

const chartData = computed<ChartData<'doughnut'>>(() => ({
  plugins: [ChartDataLabels],
  labels: props.dataLabels,
  datasets: [
    {
      data: props.dataValues,
      backgroundColor: props.dataColors,
      borderWidth: 0
    }
  ]
}))

const options = computed<ChartOptions<'doughnut'>>(() => ({
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: !!props.title,
      text: props.title
    },
    datalabels: {
      formatter: (value, ctx) => {
        const datapoints = ctx.chart.data.datasets[0].data
        const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
        const percentage = (value / total) * 100
        return percentage > 0 ? percentage.toFixed(2) + '%' : ''
      },
      font: {
        size: 14,
        weight: '500'
      },
      color: '#2e2e2e'
    }
  }
}))

const { doughnutChartProps } = useDoughnutChart({
  options,
  chartData
})
</script>

<template>
  <DoughnutChart v-bind="doughnutChartProps" />
</template>
