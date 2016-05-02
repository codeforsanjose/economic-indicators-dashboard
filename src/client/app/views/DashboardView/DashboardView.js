/* @flow */
/*global $:true*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React from 'react'
import _ from 'lodash'

import {BoxGroup} from '../../components/BoxGroup'
import {generateUUID} from '../../redux/utils/generateUUID'

import {rootDataURL, latestIndicatorsURL, introTextURL} from '../../config/dataURLs'

import {convertIndicatorsToJSON} from '../../utilities/csvtojson'

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
    this.serverRequest = $.get(introTextURL, (introText) => {
      this.setState({
        introText: introText
      })
    })

    // Get the talent data
    this.serverRequest = $.get(latestIndicatorsURL, (result) => {
      var dataURL = rootDataURL + '/' + result

      this.serverRequest = $.get(dataURL, (csvdata) => {
        var indicators = convertIndicatorsToJSON(csvdata)
        this.setState({
          indicators: indicators
        })
        this.forceUpdate()
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
    if (this.state.introText.length > 0) {
      return (
        <div className={'intro-text-content'}>{this.state.introText}</div>
      )
    }
  }

  render () {
    // If the data isn't defined - just show loading
    if (this.state === null ||
        this.state.indicators.Talent === undefined ||
        this.state.indicators.Jobs === undefined ||
        this.state.indicators.Housing === undefined ||
        this.state.indicators['Real Estate'] === undefined) {
      return (<h1>Loading data</h1>)
    }

    // ToDo - dynamically calculate from the input data
    var maxBoxes = 3

    var boxGroups = []

    _.forIn(this.state.indicators, (item, key) => {
      if (item[0] !== undefined && item[0].category !== undefined && item[0].category.length > 0) {
        var uuid = generateUUID()
        var labelClass = item[0].category.toLowerCase().trim().replace(/ /g, '-')
        var labelTitle = item[0].category.toUpperCase()
        boxGroups.push(
          <BoxGroup
            labelClass={labelClass}
            labelTitle={labelTitle}
            data={item}
            maxBoxes={maxBoxes}
            key={uuid}
          />
        )
      }
    })

    return (
      <div className='container-fluid'>
        <div className='intro-text-container'>
            {this.renderIntroText()}
        </div>
        {boxGroups}
      </div>
    )
  }
}
