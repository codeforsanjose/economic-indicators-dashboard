/* @flow */
/*global $:true*/

/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React from 'react'

import {Box} from '../../components/Box'
import {RowLabel} from '../../components/RowLabel'
// import {loadJSON} from '../../redux/utils/fetchData'
import {generateUUID} from '../../redux/utils/generateUUID'
import {showChart} from '../../charts/chartUtilities'
import {rootDataURL, latestIndicatorsURL} from '../../config/dataURLs'

import {convertIndicatorsToJSON} from '../../utilities/csvtojson'
import {dataTags} from '../../config/constants'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.

var panelStates = {}
var currentShownPanelID

panelStates['unemp-panel'] = {
  name: 'unemp-panel',
  state: 'hidden',
  group: 'jobs'
}
panelStates['jobs-panel'] = {
  name: 'jobs-panel',
  state: 'hidden',
  group: 'jobs'
}

export default class DashboardView extends React.Component {

  handleBoxClick (event) {
    var panelID = null
    var chartID = null
    // Get the current id from the element
    switch (event.currentTarget.id) {
      case 'unemp-rate':
        panelID = 'unemp-panel'
        chartID = 'unemp-chart'
        break
      case 'total-jobs' :
        panelID = 'jobs-panel'
        chartID = 'jobs-chart'
    }

    // Check if one of the available panels was selected
    if (panelID) {
      // Get the item
      var selectedPanelItem = panelStates[panelID]

      // Check if a current panel is showing and that it is different from the selected panel
      if (currentShownPanelID !== panelID && currentShownPanelID != null) {
        // Get the currently selected panel item
        var panelItem = panelStates[currentShownPanelID]

        // Hide any currently showing panels in the same group
        if (selectedPanelItem.group === panelItem.group) {
          var showingID = '#' + currentShownPanelID
          $(showingID).slideUp()
          panelStates[currentShownPanelID].state = 'hidden'
          currentShownPanelID = null
        }
      }

      // handle the selected panel id
      var id = '#' + panelID
      var $seeMoreIcon = $('.dashboardBox.' + selectedPanelItem.group).find('.dashboard-box__more-details .glyphicon')
      if (selectedPanelItem.state === 'hidden') {
        showChart(chartID)
        $(id).slideDown()
        selectedPanelItem.state = 'shown'
        currentShownPanelID = panelID
        // toggle see more icon direction and copy
        $seeMoreIcon.removeClass('glyphicon-triangle-bottom')
        $seeMoreIcon.addClass('glyphicon-triangle-top')
        $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see less')
      } else {
        $(id).slideUp()
        selectedPanelItem.state = 'hidden'
        currentShownPanelID = null
        // toggle see more icon direction copy
        $seeMoreIcon.removeClass('glyphicon-triangle-top')
        $seeMoreIcon.addClass('glyphicon-triangle-bottom')
        $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see more')
      }
    }
  }

  // Retrieve the data for the dashboard
  componentDidMount () {
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

  render () {
    // If the data isn't defined - just show loading
    if (this.state === null ||
        this.state.indicators.Talent === undefined ||
        this.state.indicators.Jobs === undefined ||
        this.state.indicators.Housing === undefined ||
        this.state.indicators['Real Estate'] === undefined) {
      return (<h1>Loading data</h1>)
    }

    // Create the collection of talent boxes
    var talentBoxes = this.state.indicators.Talent.map((item) => {
      var uuid = generateUUID()
      return (
        <Box boxType={'talent'}
          headline={item.name}
          content={item.value}
          footer={item[dataTags.changeFromPrevYear]}
          trend={item.trend}
          key={uuid}
          idName={item.id}
          date={item.date}
          clickHandler={this.handleBoxClick}
        />
      )
    })

    // Create the collection of jobs boxes
    var jobsBoxes = this.state.indicators.Jobs.map((item) => {
      var uuid = generateUUID()
      return (
        <Box boxType={'jobs'}
          headline={item.name}
          content={item.value}
          footer={item[dataTags.changeFromPrevYear]}
          trend={item.trend}
          key={uuid}
          idName={item.id}
          date={item.date}
          clickHandler={this.handleBoxClick}
        />
      )
    })
       // Create the collection of real estate boxes
    var realEstateBoxes = this.state.indicators['Real Estate'].map((item) => {
      var uuid = generateUUID()
      return (
        <Box boxType={'real-estate'}
          headline={item.name}
          content={item.value}
          footer={item[dataTags.changeFromPrevYear]}
          trend={item.trend}
          key={uuid}
          idName={item.id}
          date={item.date}
          clickHandler={this.handleBoxClick}
        />
      )
    })

    // Create the collection of housing boxes
    var housingBoxes = this.state.indicators.Housing.map((item) => {
      var uuid = generateUUID()
      return (
        <Box boxType={'housing'}
          headline={item.name}
          content={item.value}
          footer={item[dataTags.changeFromPrevYear]}
          trend={item.trend}
          key={uuid}
          idName={item.id}
          date={item.date}
          clickHandler={this.handleBoxClick}
        />
      )
    })

    return (
      <div className='container-fluid'>

        <div className='row-fluid row-eq-height'>
          <RowLabel
            labelClass={'jobs'}
            labelTitle={'JOBS'}
          />
          {jobsBoxes}
        </div>
        <div className='row'>
          <div id='unemp-panel' className='col-xs-11  jobs-chart-panel '>
            <h5>Unemployment Rate</h5>
            <div id='unemp-chart' className='jobs-plot'>
              <svg></svg>
            </div>
          </div>
        </div>
        <div className='row'>
          <div id='jobs-panel' className='col-xs-11 jobs-chart-panel'>
            <h5>Number of Jobs</h5>
            <div id='jobs-chart' className='jobs-plot'>
              <svg></svg>
            </div>
            <div id='sector-title' className='sector-title'></div>
            <div id='sector-chart' className='sector-plot'>
              <svg></svg>
            </div>
          </div>
        </div>

        <div className='row-fluid row-eq-height'>
          <RowLabel
            labelClass={'talent'}
            labelTitle={'TALENT'}
          />
          {talentBoxes}
        </div>
        <div className='row-fluid row-eq-height'>
          <RowLabel
            labelClass={'real-estate'}
            labelTitle={'REAL ESTATE'}
          />
          {realEstateBoxes}
        </div>
        <div className='row-fluid row-eq-height'>
          <RowLabel
            labelClass={'housing'}
            labelTitle={'HOUSING'}
          />
          {housingBoxes}
        </div>
      </div>
    )
  }
}
