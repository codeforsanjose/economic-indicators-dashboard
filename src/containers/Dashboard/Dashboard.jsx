/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

require('es6-promise').polyfill()

import BoxGroup from '../../components/BoxGroup'
import ChartPanel from '../../components/ChartPanel'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { chartTypes, getChartID } from '../../utilities/chartIDs'

import { getInitialDataURL } from '../../utilities/dataURLs'
import { renderIntroText } from '../../utilities/generalConfig'
import { fetchGeneralConfigIfNeeded,
         fetchChartDataIfNeeded,
         fetchSectorDataIfNeeded } from './dashboardActions'
import detailsEventHandler from './detailsEventHandler'

import '../../styles/core.scss'

class DashboardComponent extends React.Component {
  constructor () {
    super()
    this.detailsClickHandler = this.detailsClickHandler.bind(this)
  }

  showDetails (item,
               config,
               chartDataProp,
               eventId,
               sectorDataProp) {
    let chartsConfigData = {}

    if (config !== null && config !== undefined) {
      if (config.data.hasOwnProperty(item.category)) {
        if (config.data[item.category].hasOwnProperty(item.name)) {
          chartsConfigData = config.data[item.category][item.name]
        }
      }
    }

    let chartData = {}

    if (!_.isNil(chartDataProp)) {
      if (chartDataProp.hasOwnProperty(item.id)) {
        chartData = chartDataProp[item.id]
      }
    }

    let sectorData = {}
    if (!_.isNil(sectorDataProp)) {
      if (sectorDataProp.hasOwnProperty(item.id)) {
        sectorData = sectorDataProp[item.id]
      }
    }

    detailsEventHandler(eventId,
                        item.dataURL,
                        item.sectorDataURL,
                        chartsConfigData,
                        chartData,
                        item.detail2,
                        sectorData)
  }

  detailsClickHandler (inputEvent, item) {
    this.props.dispatch(fetchChartDataIfNeeded(item, inputEvent.currentTarget.id))
    if (typeof item.sectorDataURL !== 'undefined') {
      this.props.dispatch(fetchSectorDataIfNeeded(item.sectorDataURL, item.id))
    }
  }

  // Retrieve the data for the dashboard
  componentDidMount () {
    const generalURL = getInitialDataURL()

    const { dispatch } = this.props
    dispatch(fetchGeneralConfigIfNeeded(generalURL))
  }

  getChartPanels (data, chartConfig) {
    var chartPanels = data.map((item) => {
      if (item.detail1 !== undefined && item.detail1.length > 0) {
        var panelID = getChartID(item.id, chartTypes.chartPanel)
        var chartID = getChartID(item.id, chartTypes.chartID)
        var sectorChartID = getChartID(item.id, chartTypes.sector)
        var chartTitleID = getChartID(item.id, chartTypes.chartTitle)
        var sectorTitleID = getChartID(item.id, chartTypes.sectorTitle)
        var sectorPanelID = getChartID(item.id, chartTypes.sectorPanel)
        var uuid = chartID
        var hasSector = false
        if (item.sector !== undefined && item.sector.length > 0) {
          hasSector = true
        }

        let isOpened = false

        if (chartConfig.showChart && chartConfig.selectedItem.id === item.id) {
          isOpened = true
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
            isOpened={isOpened}
            chartURL={item.dataURL}
            sectorDataURL={item.sectorDataURL}
          />
        )
      }
    })

    return chartPanels
  }

  getBoxGroups (indicators,
               maxBoxes,
               chartsData,
               sectorData,
               chartsConfigData,
               chartsConfig) {
    var boxGroups = []

    _.forIn(indicators, (item, key) => {
      if (item[0] !== undefined && item[0].category !== undefined && item[0].category.length > 0) {
        var uuid = `indicator-${item[0].id}`
        var labelClass = item[0].category.toLowerCase().trim().replace(/ /g, '-')
        var labelTitle = item[0].category.toUpperCase()

        const chartPanels = this.getChartPanels(item, chartsConfig)

        boxGroups.push(
          <div key={`${uuid}-div`}>
            <BoxGroup
              labelClass={labelClass}
              labelTitle={labelTitle}
              data={item}
              maxBoxes={maxBoxes}
              key={uuid}
              chartsConfig={chartsConfig}
              chartsData={chartsData}
              sectorData={sectorData}
              detailsEventHandler={this.detailsClickHandler}
            />
            <div className='row'>
              {chartPanels}
            </div>
          </div>
        )
      }
    })

    return boxGroups
  }

  render () {
    const indicators = _.isNil(this.props.indicators) ? {} : this.props.indicators.data
    const chartsConfigData = _.isNil(this.props.chartsConfig) ? {} : this.props.chartsConfig.data
    const chartsData = _.isNil(this.props.chartData) ? {} : this.props.chartData
    const sectorData = _.isNil(this.props.sectorData) ? {} : this.props.sectorData
    const generalConfig = _.isNil(this.props.generalConfig) ? {} : this.props.generalConfig.data
    const maxBoxes = _.isNil(this.props.indicators) ? 3 : this.props.indicators.maxBoxes

    // If the data isn't defined - just show loading
    if (_.isEmpty(indicators) ||
        _.isEmpty(chartsConfigData) ||
        _.isEmpty(generalConfig)) {
      return (<h1>Loading data</h1>)
    }

    const boxGroups = this.getBoxGroups(indicators,
                                   maxBoxes,
                                   chartsData,
                                   sectorData,
                                   chartsConfigData,
                                   this.props.chartsConfig)

    if (this.props.showChart) {
      this.showDetails(this.props.selectedItem,
                  this.props.chartsConfig,
                  this.props.chartData,
                  this.props.selectedEventId,
                  this.props.sectorData)
    }

    return (
      <div>
        <Header generalConfig={generalConfig} />
        <div className='container-fluid' key='dashboard-content'>
          <div className='intro-text-container' dangerouslySetInnerHTML={renderIntroText(generalConfig)} />
            {boxGroups}
        </div>
        <Footer generalConfig={generalConfig} />
      </div>
    )
  }
}

DashboardComponent.propTypes = {
  indicators: PropTypes.object,
  generalConfig: PropTypes.object,
  chartsConfig: PropTypes.object,
  chartData: PropTypes.object,
  sectorData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  selectedEventId: PropTypes.string,
  showChart: PropTypes.bool
}

const mapStateToProps = (state) => ({
  indicators: state.indicators,
  generalConfig: state.generalConfig,
  chartsConfig: state.charts.config,
  chartData: state.charts.chartData,
  sectorData: state.charts.sectorData,
  dispatch: state.dispatch,
  selectedItem: state.charts.config.selectedItem,
  selectedEventId: state.charts.config.selectedEventId,
  showChart: state.charts.config.showChart
})

export const Dashboard = connect(mapStateToProps)(DashboardComponent)

