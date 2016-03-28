/* @flow */
import React from 'react'
import {Box} from '../../components/Box'
import {loadJSON} from '../../redux/utils/fetchData'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.

// Get the data - ToDo - Initialize store with this data
/*eslint max-len: [2, 150, 4]*/ // maximum length of 150 characters
var talent_data_url = 'https://raw.githubusercontent.com/codeforsanjose/economic-indicators-dashboard/gh-pages/data/talent.json'
var jobs_data_url = 'https://raw.githubusercontent.com/codeforsanjose/economic-indicators-dashboard/gh-pages/data/jobs.json'
var real_estate_data_url = 'https://raw.githubusercontent.com/codeforsanjose/economic-indicators-dashboard/gh-pages/data/real-' +
    'estate.json'

var talentData = loadJSON(talent_data_url)
var jobsData = loadJSON(jobs_data_url)
var realEstateData = loadJSON(real_estate_data_url)

export default class DashboardView extends React.Component {

  render () {
    var talentBoxes = talentData.data.map((item) => {
      return (
        <Box boxType={'talent'}
          headline={item.title}
          content={item.value}
          footer={item.trend_label}
        />
      )
    })

    var jobsBoxes = jobsData.data.map((item) => {
      return (
        <Box boxType={'jobs'}
          headline={item.title}
          content={item.value}
          footer={item.trend_label}
        />
      )
    })

    var realEstateBoxes = realEstateData.data.map((item) => {
      return (
        <Box boxType={'real_estate'}
          headline={item.title}
          content={item.value}
          footer={item.trend_label}
        />
      )
    })

    return (
      <div>
        <div className={'row-fluid'}>
          <div className={'talent dashboard-label col-lg-2 col-md-2 col-xs-2'}>
            <div className={'image-holder'}>
              <div className={'talent-overlay'}></div>
              <div className={'title'}>
                <h4>TALENT </h4>
              </div>
            </div>
          </div>
          <div>
            {talentBoxes}
          </div>
        </div>
        <div className={'source col-lg-offset-3 col-md-offset-3'}>
          {talentData.source}
        </div>
        <div className={'row-fluid'}>
          <div className={'jobs dashboard-label col-lg-2 col-md-2 col-xs-2'}>
            <div className={'image-holder'}>
              <div className={'jobs-overlay'}></div>
              <div className={'title'}>
                <h4>JOBS </h4>
              </div>
            </div>
          </div>
          <div>
            {jobsBoxes}
          </div>
          <div id='unemployment-panel'>Hello world- Unemployment!</div>
          <div id='jobs-panel'>Hello world - Jobs!</div>
        </div>
        <div className={'source col-lg-offset-3 col-md-offset-3'}>
          {jobsData.source}
        </div>
        <div className={'row-fluid'}>
          <div className={'real_estate dashboard-label col-lg-2 col-md-2 col-xs-2'}>
            <div className={'image-holder'}>
              <div className={'real-estate-overlay'}></div>
              <div className={'title'}>
                <h4>REAL ESTATE </h4>
              </div>
            </div>
          </div>
          <div>
            {realEstateBoxes}
          </div>
        </div>
        <div className={'source col-lg-offset-3 col-md-offset-3'}>
          {realEstateData.source}
        </div>
      </div>
    )
  }
}
