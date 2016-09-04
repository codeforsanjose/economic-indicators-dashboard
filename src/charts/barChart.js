import nv from 'nvd3'
import d3 from 'd3'

const addBarChart = (inputOptions, config, title) => {
  nv.addGraph(() => {
    const chart = nv.models.multiBarHorizontalChart()
      .margin({
        top: 50,
        right: 40,
        bottom: 50,
        left: 200
      })
      .x((d) => { return d.label })    // Specify the data accessors.
      .y((d) => { return d.value })
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

    const yTitleOffset = config['x-title-offset']

    if (yTitleOffset) {
      chart.yAxis.axisLabelDistance(yTitleOffset)
    }

    chart.xAxis
        .axisLabel(config['y-title'])

    const xTitleOffset = config['y-title-offset']

    if (xTitleOffset) {
      chart.xAxis.axisLabelDistance(xTitleOffset)
    }

    chart.barColor((d, i) => {
      const colors = d3.scale.category20().range()
      return colors[(i % colors.length) - 1]
    })

    // Set max and min for the y axis
    if (config['x-max']) {
      chart.forceY([0, config['x-max']])
      chart.yAxis.scale().domain([0, config['x-max']])
    } else {
      chart.forceY([0, inputOptions.yMax])
      chart.yAxis.scale().domain([0, inputOptions.yMax])
    }

    const id = `#${inputOptions.id}`

    d3.select(`${id} svg`)
      .datum(inputOptions.data)
      .call(chart)

    // Consruct title
    let titleToUse = config.title

    if (title) {
      titleToUse = title
    }

    d3.select(`${id}-sector`).remove()

    const titleOffset = document.getElementById(inputOptions.id).offsetWidth / 2

    d3.select(`${id} svg`).select('svg > text').remove()
    d3.select(`${id} svg`)
      .append('text')
      .attr('x', titleOffset)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('id', `${inputOptions.id}-sector`)
      .text(titleToUse)

    nv.utils.windowResize(chart.update)

    return chart
  })
}

export default addBarChart
