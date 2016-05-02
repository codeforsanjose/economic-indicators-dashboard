/* @flow */

/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'

import {Box, getPanelID, getChartID, getChartTitleID, getSectorTitleID, getSectorID} from './Box'
import {RowLabel} from './RowLabel'
import {generateUUID} from '../redux/utils/generateUUID'
import {dataTags} from '../config/constants'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  labelClass: PropTypes.string,
  labelTitle: PropTypes.string,
  maxBoxes: PropTypes.number,
  data: PropTypes.array
}

export var BoxGroup = React.createClass({
  propTypes: {
    labelClass: PropTypes.string,
    labelTitle: PropTypes.string,
    maxBoxes: PropTypes.number,
    data: PropTypes.array
  },

  render: function () {
    var title = this.props.labelTitle
    title = title.toUpperCase()

    var boxes = this.props.data.map((item) => {
      var uuid = generateUUID()
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
          maxBoxes={this.props.maxBoxes}
          source={item.source}
        />
      )
    })

    var chartPanels = this.props.data.map((item) => {
      if (item.detail1 !== undefined && item.detail1.length > 0) {
        var panelID = getPanelID(item.id)
        var chartID = getChartID(item.id)
        var sectorChartID = getSectorID(item.id)
        var chartTitleID = getChartTitleID(item.id)
        var sectorTitleID = getSectorTitleID(item.id)
        var uuid = generateUUID()
        
        return (
          <div id={panelID} className={'chart-hidden chart-panel col-sm-offset-1'}>
            <div id={chartTitleID} className={'chart-title'}></div>
            <div id={chartID} className={'chart'}>
            </div>
            <div id={sectorTitleID} className={'sector-title'}></div>
            <div id={sectorChartID} className={'sector-chart'}>
              Hello World
            </div>
          </div>
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
        <div className='row-fluid row-eq-height'>
          {chartPanels}
        </div>
      </div>
    )
  }
})

