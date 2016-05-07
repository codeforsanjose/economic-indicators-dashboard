/*global nv, d3:true*/

export function addBarChart (inputOptions, config, title) {
  nv.addGraph(function () {
    var chart = nv.models.multiBarHorizontalChart()
      .margin({top: 50, right: 40, bottom: 50, left: 200})
      .x(function (d) { return d.label })    // Specify the data accessors.
      .y(function (d) { return d.value })
      .showControls(false)
      .showLegend(false)

    chart.xAxis
      .axisLabel(inputOptions.xAxisLabel)

    if (inputOptions.yMax < 100) {
      chart.yAxis
        .tickFormat(d3.format(',.1f'))
    } else {
      chart.yAxis
        .tickFormat(d3.format(',.0d'))
    }

    chart.yAxis
        .axisLabel(config['y-title'])
        .axisLabelDistance(config['y-title-offset'])

    chart.xAxis
        .axisLabel(config['x-title'])
        .axisLabelDistance(config['x-title-offset'])

    chart.barColor(function (d, i) {
      var colors = d3.scale.category20().range()
      return colors[i % colors.length - 1]
    })

    chart.forceY([0, inputOptions.yMax])
    chart.yAxis.scale().domain([0, inputOptions.yMax])

    var id = '#' + inputOptions.id

    d3.select(id + ' svg')
      .datum(inputOptions.data)
      .call(chart)

    // Consruct title
    var titleToUse = config['title']

    if (title) {
      titleToUse = title
    }

    console.log(title)
    console.log(titleToUse)
    console.log(inputOptions.id)
    d3.select(id + '-sector').remove()

    d3.select(id + ' svg')
      .append('text')
      .attr('x', config['title-offset'])
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('id', inputOptions.id + '-sector')
      .text(titleToUse)

    nv.utils.windowResize(chart.update)

    return chart
  })
}
