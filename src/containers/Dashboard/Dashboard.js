/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
var shortid = require('shortid')

require('es6-promise').polyfill()

import { BoxGroup } from '../../components/BoxGroup'
import { ChartPanel } from '../../components/ChartPanel'

import { chartTypes, getChartID } from '../../utilities/chartIDs'

import { getInitialDataURL } from '../../utilities/dataURLs'
import { renderIntroText,
         renderTitleRight,
         renderFooterRight } from '../../utilities/generalConfig'
import { fetchGeneralConfigIfNeeded,
  fetchChartDataIfNeeded,
  fetchSectorDataIfNeeded } from './dashboardActions'
import { detailsEventHandler } from './detailsEventHandler'

import '../../styles/core.scss'

class DashboardComponent extends React.Component {
  constructor () {
    super()
    this.detailsClickHandler = this.detailsClickHandler.bind(this)
  }

  detailsClickHandler (inputEvent) {
    let chartsConfigData = {}
    const chartData = this.props.chartsConfig.data

    let item = {}
    _.forEach(this.props.indicators.data, (value, key) => {
      value.forEach((element, index, array) => {
        if (element.id === inputEvent.currentTarget.id) {
          item = element
        }
      })
    })

    if (chartData !== null && chartData !== undefined) {
      if (chartData.hasOwnProperty(item.category)) {
        if (chartData[item.category].hasOwnProperty(item.name)) {
          chartsConfigData = chartData[item.category][item.name]
        }
      }
    }
    detailsEventHandler(inputEvent.currentTarget.id,
                        item.dataURL,
                        item.sectorDataURL,
                        chartsConfigData,
                        item.detail2)
    // ToDo - replace detailsEventHandler with action/reducers
    this.props.dispatch(fetchChartDataIfNeeded(item.dataURL))
    this.props.dispatch(fetchSectorDataIfNeeded(item.sectorDataURL))
  }

  // Retrieve the data for the dashboard
  componentDidMount () {
    const generalURL = getInitialDataURL()

    const { dispatch } = this.props
    dispatch(fetchGeneralConfigIfNeeded(generalURL))
  }

  getChartPanels (data) {
    var chartPanels = data.map((item) => {
      if (item.detail1 !== undefined && item.detail1.length > 0) {
        var panelID = getChartID(item.id, chartTypes.chartPanel)
        var chartID = getChartID(item.id, chartTypes.chartID)
        var sectorChartID = getChartID(item.id, chartTypes.sector)
        var chartTitleID = getChartID(item.id, chartTypes.chartTitle)
        var sectorTitleID = getChartID(item.id, chartTypes.sectorTitle)
        var sectorPanelID = getChartID(item.id, chartTypes.sectorPanel)
        var uuid = shortid.generate()
        var hasSector = false
        if (item.sector !== undefined && item.sector.length > 0) {
          hasSector = true
        }

        return (
          <ChartPanel
            key={uuid}
            panelID={panelID}
            chartTitleID={chartTitleID}
            chartID={chartID}
            sectorTitleID={sectorTitleID}
            sectorChartID={sectorChartID}
            hasSector={hasSector}
            sectorPanelID={sectorPanelID}
          />
        )
      }
    })

    return chartPanels
  }

  render () {
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

        const chartPanels = this.getChartPanels(item)

        boxGroups.push(
          <div>
            <BoxGroup
              labelClass={labelClass}
              labelTitle={labelTitle}
              data={item}
              maxBoxes={maxBoxes}
              key={uuid}
              chartsConfig={chartsConfig}
              detailsEventHandler={this.detailsClickHandler}
            />
            <div className='row'>
              {chartPanels}
            </div>
          </div>
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

