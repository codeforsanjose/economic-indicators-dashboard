/*global nv, d3:true*/

export const addBarChart = (inputOptions, config, title) => {
  nv.addGraph(function () {
    var chart = nv.models.multiBarHorizontalChart()
      .margin({top: 50, right: 40, bottom: 50, left: 200})
      .x(function (d) { return d.label })    // Specify the data accessors.
      .y(function (d) { return d.value })
      .showControls(false)
      .showLegend(false)

    if (inputOptions.yMax < 100) {
      chart.yAxis
        .tickFormat(d3.format(',.1f'))
    } else {
      chart.yAxis
        .tickFormat(d3.format(',.0d'))
    }

    // Set yAxis
    chart.yAxis
        .axisLabel(config['x-title'])

    var yTitleOffset = config['x-title-offset']

    if (yTitleOffset) {
      chart.yAxis.axisLabelDistance(yTitleOffset)
    }

    chart.xAxis
        .axisLabel(config['y-title'])

    var xTitleOffset = config['y-title-offset']

    if (xTitleOffset) {
      chart.xAxis.axisLabelDistance(xTitleOffset)
    }

    chart.barColor(function (d, i) {
      var colors = d3.scale.category20().range()
      return colors[i % colors.length - 1]
    })

    // Set max and min for the y axis
    if (config['x-max']) {
      chart.forceY([0, config['x-max']])
      chart.yAxis.scale().domain([0, config['x-max']])
    } else {
      chart.forceY([0, inputOptions.yMax])
      chart.yAxis.scale().domain([0, inputOptions.yMax])
    }

    var id = '#' + inputOptions.id

    d3.select(id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    // Consruct title
    var titleToUse = config['title']

    if (title) {
      titleToUse = title
    }

    d3.select(id + '-sector').remove()

    var titleOffset = document.getElementById(inputOptions.id).offsetWidth / 2

    d3.select(id + ' svg')
      .append('text')
      .attr('x', titleOffset)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('id', inputOptions.id + '-sector')
      .text(titleToUse)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
