/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'

class ChartPanel extends React.Component {
  render () {
    var panelID = this.props.panelID
    var chartTitleID = this.props.chartTitleID
    var chartID = this.props.chartID
    var sectorTitleID = this.props.sectorTitleID
    var sectorChartID = this.props.sectorChartID
    var sectorPanelID = this.props.sectorPanelID
    var chartURL = this.props.chartURL
    var sectorDataURL = this.props.sectorDataURL

    const chartDownloadName = chartTitleID + '.csv'
    const sectorDownloadName = sectorTitleID + '.csv'

    var chartClassName = 'chart-hidden chart-panel col-sm-offset-1 '
    // ToDo - figure out why layout is wrong when using sectorClassName
    //        instead of chartClassName for the sector panel.  When
    //        using sectorClassName, the sector panel appears to overlap
    //        the chart panel, but the sector chart draws on top of the
    //        set of boxes below the opened chart
    var sectorClassName = 'sector-hidden sector-panel col-sm-offset-1 '

    var chartWidthClass = 'col-sm-8'
    if (this.props.hasSector) {
      chartWidthClass = 'col-sm-8'
      sectorClassName += 'col-sm-8'
    }

    chartClassName += chartWidthClass

    return (
      <div>
        <div id={panelID} className={chartClassName}>
          <div id={chartTitleID} className={'chart-data-link'}>
            <a href={chartURL} download={chartDownloadName}>download data</a>
          </div>
          <div id={chartID} className={'chart'}>
            <svg></svg>
          </div>
        </div>
        <div id={sectorPanelID} className={chartClassName}>
          <hr />
          <div id={sectorTitleID} className={'chart-data-link'}>
            <a href={sectorDataURL} download={sectorDownloadName}>download data</a>
          </div>
          <div id={sectorChartID} className={'sector-chart'}>
            <svg></svg>
          </div>
        </div>
      </div>
    )
  }
}

ChartPanel.propTypes = {
  panelID: PropTypes.string.isRequired,
  chartTitleID: PropTypes.string.isRequired,
  chartID: PropTypes.string.isRequired,
  sectorTitleID: PropTypes.string.isRequired,
  sectorChartID: PropTypes.string.isRequired,
  hasSector: PropTypes.bool.isRequired,
  chartsConfig: PropTypes.object,
  sectorPanelID: PropTypes.string.isRequired,
  chartURL: PropTypes.string,
  sectorDataURL: PropTypes.string
}

export { ChartPanel }
