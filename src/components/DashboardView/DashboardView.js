/* @flow */
/*global $:true*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React from 'react'
import _ from 'lodash'
var shortid = require('shortid')

import {BoxGroup} from '../../components/BoxGroup'

import {constructOpenDataURL} from '../../config/dataURLs'
import {convertIndicatorsToJSON} from '../../utilities/csvtojson'

import '../../styles/core.scss'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.

export default class DashboardView extends React.Component {
  // Retrieve the data for the dashboard
  componentDidMount () {
    // var generalURL = rootDataURL + '/' + generalConfig
    var rootDiv = document.getElementById('root')
    var generalURL = rootDiv.getAttribute('data-config')

    this.serverRequest = $.get(generalURL, (configData) => {
      this.setState({
        generalConfig: JSON.parse(configData)
      })

      var latestIndicatorsURL = constructOpenDataURL(this.state.generalConfig['open-data-url'],
                                                      this.state.generalConfig['indicator-guid'],
                                                      this.state.generalConfig['api-key'])

      // Get the indicator data
      this.serverRequest = $.get(latestIndicatorsURL, (csvdata) => {
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

        var chartURL = this.state.generalConfig['chart-config-file']
        this.serverRequest = $.get(chartURL, (chartsConfigData) => {
          this.setState({
            chartsConfig: JSON.parse(chartsConfigData)
          })
          this.forceUpdate()
        })
      })
    })
  }

  // don't update if the data hasn't finished being retrieved
  shouldComponentUpdate () {
    var returnStatus = true

    if (!this.state) {
      returnStatus = false
    }
    console.log('shouldcomponentUpdate ' + returnStatus)
    return returnStatus
  }

  renderIntroText () {
    if (this.state.generalConfig['intro-text'].length > 0) {
      return {
        __html: this.state.generalConfig['intro-text']
      }
    }
  }

  renderTitleRight () {
    if (this.state.generalConfig['header-right-text'].length > 0) {
      return (this.state.generalConfig['header-right-text'])
    }
  }

  renderFooterRight () {
    if (this.state.generalConfig['footer-right-text'].length > 0) {
      return (this.state.generalConfig['footer-right-text'])
    }
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
                <span id='header-title-right-content'>{this.renderTitleRight()}</span>
              </span>
            </div>
          </nav>
        </div>
        <div className='container-fluid'>
          <div className='intro-text-container' dangerouslySetInnerHTML={this.renderIntroText()} />
            {boxGroups}
        </div>
        <div>
          <footer className='econ-footer'>
            <div className='container'>
              <span className='footer-subtext' id='footer-right-content'>{this.renderFooterRight()}</span>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}
