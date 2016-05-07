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
  chartsConfig: PropTypes.object
}

export var ChartPanel = React.createClass({
  propTypes: {
    panelID: PropTypes.string,
    chartTitleID: PropTypes.string,
    chartID: PropTypes.string,
    sectorTitleID: PropTypes.string,
    sectorChartID: PropTypes.string,
    hasSector: PropTypes.bool,
    chartsConfig: PropTypes.object
  },

  render: function () {
    var panelID = this.props.panelID
    var chartTitleID = this.props.chartTitleID
    var chartID = this.props.chartID
    var sectorTitleID = this.props.sectorTitleID
    var sectorChartID = this.props.sectorChartID

    var chartClassName = 'chart-hidden chart-panel col-sm-offset-1 '
    var sectorClassName = 'sector-title '

    var chartWidthClass = 'col-sm-8'
    if (this.props.hasSector) {
      chartWidthClass = 'col-sm-8'
      sectorClassName += 'col-sm-8'
    }

    chartClassName += chartWidthClass

    return (
      <div id={panelID} className={chartClassName}>
        <div id={chartTitleID} className={'chart-title'}></div>
        <div id={chartID} className={'chart'}>
          <svg></svg>
        </div>
        <hr />
        <div id={sectorTitleID} className={sectorClassName}></div>
        <div id={sectorChartID} className={'sector-chart'}>
          <svg></svg>
        </div>
      </div>
    )
  }
})

