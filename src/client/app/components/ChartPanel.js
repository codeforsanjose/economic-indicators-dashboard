/* @flow */

/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  panelID: PropTypes.string,
  chartTitleID: PropTypes.string,
  chartID: PropTypes.string,
  sectorTitleID: PropTypes.string,
  sectorChartID: PropTypes.string,
  hasSector: PropTypes.bool,
  chartsConfig: PropTypes.object,
  sectorPanelID: PropTypes.string
}

export var ChartPanel = React.createClass({
  propTypes: {
    panelID: PropTypes.string,
    chartTitleID: PropTypes.string,
    chartID: PropTypes.string,
    sectorTitleID: PropTypes.string,
    sectorChartID: PropTypes.string,
    hasSector: PropTypes.bool,
    chartsConfig: PropTypes.object,
    sectorPanelID: PropTypes.string
  },

  render: function () {
    var panelID = this.props.panelID
    var chartTitleID = this.props.chartTitleID
    var chartID = this.props.chartID
    var sectorTitleID = this.props.sectorTitleID
    var sectorChartID = this.props.sectorChartID
    var sectorPanelID = this.props.sectorPanelID

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
          <div id={chartTitleID} className={'chart-title'}></div>
          <div id={chartID} className={'chart'}>
            <svg></svg>
          </div>
        </div>
        <div id={sectorPanelID} className={chartClassName}>
          <hr />
          <div id={sectorTitleID} className={'sector-title'}></div>
          <div id={sectorChartID} className={'sector-chart'}>
            <svg></svg>
          </div>
        </div>
      </div>
    )
  }
})

