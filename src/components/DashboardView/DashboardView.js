/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React from 'react'
import _ from 'lodash'
var shortid = require('shortid')

require('es6-promise').polyfill()
import fetch from 'isomorphic-fetch'

import {BoxGroup} from '../../components/BoxGroup'

import {constructOpenDataURL} from '../../config/dataURLs'
import {convertIndicatorsToJSON} from '../../utilities/csvtojson'

import '../../styles/core.scss'

const renderIntroText = (config) => {
  if (config['intro-text'].length > 0) {
    return {
      __html: config['intro-text']
    }
  }
}

const renderTitleRight = (config) => {
  if (config['header-right-text'].length > 0) {
    return (config['header-right-text'])
  }
}

const renderFooterRight = (config) => {
  if (config['footer-right-text'].length > 0) {
    return (config['footer-right-text'])
  }
}

export default class DashboardView extends React.Component {
  processIndicators (csvdata) {
    var indicators = convertIndicatorsToJSON(csvdata)
    this.setState({
      indicators: indicators
    })
    _.forIn(indicators, (set) => {
      _.forIn(set, (item) => {
        if (item.detail1) {
          var newDetail1 = constructOpenDataURL(this.state.generalConfig['open-data-url'],
                                                 item.detail1,
                                                 this.state.generalConfig['api-key'])
          item.dataURL = newDetail1
        }
        if (item.detail2) {
          var newDetail2 = constructOpenDataURL(this.state.generalConfig['open-data-url'],
                                                  item.detail2,
                                                  this.state.generalConfig['api-key'])
          item.sectorDataURL = newDetail2
        }
      })
    })
    this.forceUpdate()
  }

  processChartConfig (data) {
    this.setState({
      chartsConfig: data
    })
  }

  processGeneralConfig (data) {
    this.setState({
      generalConfig: data
    })

    var latestIndicatorsURL = constructOpenDataURL(this.state.generalConfig['open-data-url'],
                                                      this.state.generalConfig['indicator-guid'],
                                                      this.state.generalConfig['api-key'])

    fetch(latestIndicatorsURL,
      {
        method: 'get'
      }
    )
    .then((res) => res.text())
    .then((data) => {
      this.processIndicators(data)
    })
    .catch((err) => {
      console.log(err)
    })

    var chartURL = this.state.generalConfig['chart-config-file']
    fetch(chartURL,
      {
        method: 'get'
      }
    )
    .then((res) => res.json())
    .then((data) => {
      this.processChartConfig(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // Retrieve the data for the dashboard
  componentDidMount () {
    // var generalURL = rootDataURL + '/' + generalConfig
    var rootDiv = document.getElementById('root')
    var generalURL = rootDiv.getAttribute('data-config')

    fetch(generalURL,
      {
        method: 'get'
      }
    )
    .then((res) => res.json())
    .then((data) => {
      this.processGeneralConfig(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // don't update if the data hasn't finished being retrieved
  shouldComponentUpdate () {
    var returnStatus = true

    if (!this.state) {
      returnStatus = false
    }
    return returnStatus
  }

  render () {
    // If the data isn't defined - just show loading
    if (this.state === null ||
        this.state.indicators === null ||
        this.state.indicators === undefined) {
      return (<h1>Loading data</h1>)
    }

    // ToDo - dynamically calculate from the input data
    var maxBoxes = 3

    var boxGroups = []

    _.forIn(this.state.indicators, (item, key) => {
      if (item[0] !== undefined && item[0].category !== undefined && item[0].category.length > 0) {
        var uuid = shortid.generate()
        var labelClass = item[0].category.toLowerCase().trim().replace(/ /g, '-')
        var labelTitle = item[0].category.toUpperCase()
        boxGroups.push(
          <BoxGroup
            labelClass={labelClass}
            labelTitle={labelTitle}
            data={item}
            maxBoxes={maxBoxes}
            key={uuid}
            chartsConfig={this.state.chartsConfig}
          />
        )
      }
    })

    return (
      <div>
        <div>
          <nav className='navbar econ-header'>
            <div className='container-fluid'>
              <span className='head-title'><span className='sjeconomy'>SJECONOMY</span> INDICATORS</span>
              <span className='nav navbar-nav navbar-right head-title-right'>
                <span id='header-title-right-content'>{renderTitleRight(this.state.generalConfig)}</span>
              </span>
            </div>
          </nav>
        </div>
        <div className='container-fluid'>
          <div className='intro-text-container' dangerouslySetInnerHTML={renderIntroText(this.state.generalConfig)} />
            {boxGroups}
        </div>
        <div>
          <footer className='econ-footer'>
            <div className='container'>
              <span className='footer-subtext' id='footer-right-content'>{renderFooterRight(this.state.generalConfig)}</span>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}
