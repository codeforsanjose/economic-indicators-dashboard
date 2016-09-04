import nv from 'nvd3'
import d3 from 'd3'
import _ from 'lodash'
import numeral from 'numeral'

const addLineChart = (inputOptions, config) => {
  nv.addGraph(() => {
    const chart = nv.models.lineChart()
      .x((d) => {
        if (d) {
          return d.label
        }
        return ''
      })
      .y((d) => {
        if (d) {
          return d.value
        }
        return 0
      })
      .margin({ top: 30, right: 10, bottom: 60, left: 100 })
      .useInteractiveGuideline(true)
      .showYAxis(true)
      .showXAxis(true)
      .showLegend(inputOptions.showLegend)

    chart.legend.margin({ top: 20, right: 0, bottom: 15, left: 0 })

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

    if (config.hasOwnProperty('x-tick-interval')) {
      const numValues = inputOptions.data[0].values.length
      const tickInterval = config['x-tick-interval']
      let tickValues = []
      switch (tickInterval) {
        case 'quarters': {
          const intervalCount = Math.ceil(numValues / 4)

          tickValues = _.times(intervalCount, (index) => {
            return index * 4
          })
          break
        }
        case 'months':
        default: {
          const numYears = Math.ceil(numValues / 12)

          tickValues = _.times(numYears, (index) => {
            return index * 12
          })
          break
        }
      }
      chart.xAxis.tickValues(tickValues)
    }

    chart.xAxis
        .axisLabel(config['x-title'])
        .axisLabelDistance(config['x-title-offset'])
        .showMaxMin(false)

    let yMin = 0
    let yMax = 100000

    if (config.hasOwnProperty(['y-min'])) {
      yMin = config['y-min']
    }

    if (config.hasOwnProperty('y-max')) {
      yMax = config['y-max']
    } else if (inputOptions.hasOwnProperty('yMax')) {
      yMax = inputOptions.yMax
    }

    if (config.hasOwnProperty('y-axis-tick-format')) {
      const yAxisTickFormat = config['y-axis-tick-format']
      switch (yAxisTickFormat) {
        case 'currency':
          chart.yAxis.tickFormat((d) => {
            if (d) {
              return numeral(d).format('$0,0')
            }
            return '$0'
          })
          break
        case 'percent':
        default:
          chart.yAxis.tickFormat((d) => {
            if (d) {
              return `${d}%`
            }
            return '%'
          })
          break
      }
    }

    chart.forceY([yMin, yMax])
    chart.yAxis.scale().domain([yMin, yMax])

    chart.xAxis.tickFormat((d) => {
      if (d) {
        return inputOptions.xTickLabels[d]
      }
      return ''
    })

    chart.xAxis.rotateLabels(-45)

    chart.lines.dispatch.on('elementClick', (e) => {
      inputOptions.chartEvents(inputOptions.xTickLabels[e[0].point.label], e[0].point.value)
      chart.lines.clearHighlights()
      chart.lines.highlightPoint(inputOptions.xTickLabels[e[0].point.label], e[0].point.value, true)
    })

    chart.interactiveLayer.dispatch.on('elementMousemove', (e) => {
      inputOptions.chartEvents(inputOptions.xTickLabels[e[0].point.label], e[0].point.value)
      chart.lines.clearHighlights()
      chart.lines.highlightPoint(inputOptions.xTickLabels[e[0].point.label], e[0].point.value, true)
    })

    chart.interactiveLayer.dispatch.on('elementMouseout', () => {
      chart.lines.clearHighlights()
    })

    const id = `#${inputOptions.id}`
    const svgTag = `${id} svg`

    d3.select(svgTag)
      .datum(inputOptions.data)
      .call(chart)

    const titleOffset = document.getElementById(inputOptions.id).offsetWidth / 2

    d3.selectAll('.nv-axisMax-y').remove()

    d3.select(svgTag).select('svg > text').remove()
    d3.select(svgTag)
      .append('text')
      .attr('x', titleOffset)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(config.title)

    nv.utils.windowResize(chart.update)

    return chart
  })
}

export default addLineChart
