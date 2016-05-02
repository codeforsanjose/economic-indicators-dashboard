/*global nv, d3:true*/

export function addBarChart (inputOptions) {
  nv.addGraph(function () {
    var chart = nv.models.discreteBarChart()
      .margin({top: 50, right: 20, bottom: 150, left: 120})
      .x(function (d) { return d.label })    // Specify the data accessors.
      .y(function (d) { return d.value })

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    chart.yAxis
      .tickFormat(d3.format(',.1f'))
      .axisLabel(inputOptions.yAxisLabel)

    chart.rotateLabels(-45)

    var maxY = 0

    for (var i = 0; i < inputOptions.data[0].values.length; i++) {
      var newY = inputOptions.data[0].values[i].value

      if (newY > maxY) {
        maxY = newY
      }
    }

    chart.forceY([0, maxY + (maxY * 0.1)])
    chart.yAxis.scale().domain([0, maxY + (maxY * 0.1)])

    d3.select('#' + inputOptions.id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
