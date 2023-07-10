//HighChartsJS
Highcharts.chart('highcharts', {
  chart: {
    type: 'line'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    title: {
      text: ''
    },
    labels: {
      format: '${value}'
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
    valueSuffix: '$'
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
    }
  },
  series: [{
    name: 'Vihicles',
    data: [16000.0, 18000.0, 23000.0, 27000.0, 32000.0, 36000.0, 39000.0, 38000.0, 35000.0, 49000.0,
      22000.0, 17000.0]
  },
  ]
});
