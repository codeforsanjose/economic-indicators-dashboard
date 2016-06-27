/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
var shortid = require('shortid')

import { Box } from './Box'
import { chartTypes, getChartID } from '../utilities/chartIDs'
import { ChartPanel } from './ChartPanel'
import { RowLabel } from './RowLabel'
import { dataTags } from '../config/constants'

class BoxGroup extends React.Component {
  render () {
    var title = this.props.labelTitle
    title = title.toUpperCase()

    var chartsConfig = this.props.chartsConfig

    var boxes = this.props.data.map((item) => {
      var uuid = shortid.generate()

      var chartsConfigData = {}

      if (chartsConfig !== null && chartsConfig !== undefined) {
        if (chartsConfig.hasOwnProperty(item.category)) {
          if (chartsConfig[item.category].hasOwnProperty(item.name)) {
            chartsConfigData = chartsConfig[item.category][item.name]
          }
        }
      }

      return (
        <Box boxType={this.props.labelClass}
          headline={item.name}
          content={item.value}
          footer={item[dataTags.changeFromPrevYear]}
          trend={item.trend}
          key={uuid}
          idName={item.id}
          date={item.date}
          details={item.detail1}
          dataURL={item.dataURL}
          maxBoxes={this.props.maxBoxes}
          source={item.source}
          sector={item.detail2}
          sectorDataURL={item.sectorDataURL}
          chartsConfig={chartsConfigData}
        />
      )
    })

    var chartPanels = this.props.data.map((item) => {
      if (item.detail1 !== undefined && item.detail1.length > 0) {
        var panelID = getChartID(item.id, chartTypes.chartPanel)
        var chartID = getChartID(item.id, chartTypes.chartID)
        var sectorChartID = getChartID(item.id, chartTypes.sector)
        var chartTitleID = getChartID(item.id, chartTypes.chartTitle)
        var sectorTitleID = getChartID(item.id, chartTypes.sectorTitle)
        var sectorPanelID = getChartID(item.id, chartTypes.sectorPanel)
        var uuid = shortid.generate()
        var hasSector = false
        if (item.sector !== undefined && item.sector.length > 0) {
          hasSector = true
        }

        return (
          <ChartPanel
            key={uuid}
            panelID={panelID}
            chartTitleID={chartTitleID}
            chartID={chartID}
            sectorTitleID={sectorTitleID}
            sectorChartID={sectorChartID}
            hasSector={hasSector}
            sectorPanelID={sectorPanelID}
          />
        )
      }
    })

    return (
      <div>
        <div className='row-fluid row-eq-height'>
          <RowLabel
            labelClass={this.props.labelClass}
            labelTitle={title}
          />
          {boxes}
        </div>
        <div className='row'>
          {chartPanels}
        </div>
      </div>
    )
  }
}

BoxGroup.propTypes = {
  labelClass: PropTypes.string,
  labelTitle: PropTypes.string,
  maxBoxes: PropTypes.number,
  data: PropTypes.array,
  chartsConfig: PropTypes.object
}

export { BoxGroup }
