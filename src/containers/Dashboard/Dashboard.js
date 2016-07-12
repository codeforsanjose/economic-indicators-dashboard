/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
var shortid = require('shortid')

require('es6-promise').polyfill()

import { BoxGroup } from '../../components/BoxGroup'

import { fetchGeneralConfigIfNeeded } from './dashboardActions'

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

class DashboardComponent extends React.Component {
  // Retrieve the data for the dashboard
  componentDidMount () {
    var rootDiv = document.getElementById('root')
    var generalURL = rootDiv.getAttribute('data-config')

    const { dispatch } = this.props
    dispatch(fetchGeneralConfigIfNeeded(generalURL))
  }

  render () {
    console.log(this.props)
    const indicators = _.isNil(this.props.indicators) ? {} : this.props.indicators.data
    const chartsConfig = _.isNil(this.props.chartsConfig) ? {} : this.props.chartsConfig.data
    const generalConfig = _.isNil(this.props.generalConfig) ? {} : this.props.generalConfig.data
    const maxBoxes = _.isNil(this.props.indicators) ? 3 : this.props.indicators.maxBoxes

    // If the data isn't defined - just show loading
    if (_.isEmpty(indicators) ||
        _.isEmpty(chartsConfig) ||
        _.isEmpty(generalConfig)) {
      return (<h1>Loading data</h1>)
    }

    var boxGroups = []

    _.forIn(indicators, (item, key) => {
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
            chartsConfig={chartsConfig}
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
                <span id='header-title-right-content'>{renderTitleRight(generalConfig)}</span>
              </span>
            </div>
          </nav>
        </div>
        <div className='container-fluid'>
          <div className='intro-text-container' dangerouslySetInnerHTML={renderIntroText(generalConfig)} />
            {boxGroups}
        </div>
        <div>
          <footer className='econ-footer'>
            <div className='container'>
              <span className='footer-subtext' id='footer-right-content'>{renderFooterRight(generalConfig)}</span>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

DashboardComponent.propTypes = {
  indicators: PropTypes.object,
  generalConfig: PropTypes.object,
  chartsConfig: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  indicators: state.indicators,
  generalConfig: state.generalConfig,
  chartsConfig: state.chartsConfig,
  dispatch: state.dispatch
})

export const Dashboard = connect(mapStateToProps)(DashboardComponent)

