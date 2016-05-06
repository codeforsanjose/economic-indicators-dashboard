/*global nv, d3:true*/

export function addBarChart (inputOptions) {
  nv.addGraph(function () {
    var chart = nv.models.multiBarHorizontalChart()
      .margin({top: 50, right: 40, bottom: 150, left: 200})
      .x(function (d) { return d.label })    // Specify the data accessors.
      .y(function (d) { return d.value })
      .showControls(false)

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    var maxY = 100000

    if (maxY < 100) {
      chart.yAxis
        .tickFormat(d3.format(',.1f'))
        .axisLabel(inputOptions.yAxisLabel)
    } else {
      chart.yAxis
        .tickFormat(d3.format(',.0d'))
        .axisLabel(inputOptions.yAxisLabel)
    }

    // chart.rotateLabels(-45)

    chart.barColor(function (d, i) {
      var colors = d3.scale.category20().range()
      return colors[i % colors.length - 1]
    })

    chart.forceY([0, maxY])
    chart.yAxis.scale().domain([0, maxY])

    d3.select('#' + inputOptions.id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
