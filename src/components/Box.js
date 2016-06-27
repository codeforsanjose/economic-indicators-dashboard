/*global $:true*/
/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 250, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { showChart } from '../charts/chartUtilities'
import { chartTypes, getChartID } from '../utilities/chartIDs'

const renderDetailsButton = (details, idName) => {
  if (details !== undefined && details.length > 0) {
    return (
      <div className={'dashboard-box__more-details'} id={idName + '-more-details'}><span className='dashboard-box__more-details-copy'>see more </span><span className='glyphicon glyphicon-chevron-down'></span></div>
    )
  }
}

const renderInfoButton = (source, idName) => {
  var tooltipText = 'Source: ' + source
  var tooltipID = idName + '-info-tooltip'

  return (
    <div className='tooltip-box'>
      <a data-tip data-for={tooltipID}> <span className='glyphicon glyphicon-info-sign info'></span></a>
      <ReactTooltip place='right' type='info' effect='solid' className='info-tooltip' id={tooltipID}>
        <div className='tooltip-content'>
          <span>{tooltipText}</span>
        </div>
      </ReactTooltip>
    </div>
  )
}

const hideSectorPanels = () => {
  const visibleElements = $.find('.sector-visible')
  visibleElements.forEach((value) => {
    $(value).slideUp()
    $(value).removeClass('sector-visible')
    $(value).addClass('sector-hidden')
  })
}

const resetSeeMore = () => {
  const visibleElements = $.find('.dashboard-box__more-details .glyphicon')
  visibleElements.forEach((value) => {
    $(value).removeClass('glyphicon-chevron-up')
    $(value).addClass('glyphicon-chevron-down')
    $(value).siblings('.dashboard-box__more-details-copy').text('see more')
  })
}

const hideChartPanels = () => {
  const visibleElements = $.find('.chart-visible')
  visibleElements.forEach((value) => {
    $(value).slideUp()
    $(value).removeClass('chart-visible')
    $(value).addClass('chart-hidden')
  })
}

const toggleSectorPanel = (sectorID) => {
  if ($(sectorID).hasClass('chart-hidden')) {
    $(sectorID).slideDown()
    $(sectorID).removeClass('chart-hidden')
    $(sectorID).addClass('chart-visible')
  } else {
    $(sectorID).slideUp()
    $(sectorID).removeClass('chart-visible')
    $(sectorID).addClass('chart-hidden')
  }
}

const toggleChartPanel = (show, id) => {
  if (show) {
    $(id).slideDown()
    $(id).removeClass('chart-hidden')
    $(id).addClass('chart-visible')
  } else {
    $(id).slideUp()
    $(id).removeClass('chart-visible')
    $(id).addClass('chart-hidden')
  }
}

const Box = React.createClass({
  propTypes: {
    boxType: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
    trend: PropTypes.string.isRequired,
    idName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    maxBoxes: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    details: PropTypes.string,
    sector: PropTypes.string.isRequired,
    dataURL: PropTypes.string.isRequired,
    sectorDataURL: PropTypes.string.isRequired,
    chartsConfig: PropTypes.object.isRequired
  },

  clickHandler (event) {
    var panelID = getChartID(event.currentTarget.id, chartTypes.chartPanel)
    var chartID = getChartID(event.currentTarget.id, chartTypes.chartID)
    var sectorChartID = getChartID(event.currentTarget.id, chartTypes.sector)
    var sectorTitleID = getChartID(event.currentTarget.id, chartTypes.sectorTitle)
    var sectorPanelID = getChartID(event.currentTarget.id, chartTypes.sectorPanel)
    // handle the selected panel id
    var id = '#' + panelID
    var sectorID = '#' + sectorPanelID
    var $seeMoreIcon = $('#' + event.currentTarget.id).find('.dashboard-box__more-details .glyphicon')
    if ($(id).hasClass('chart-hidden')) {
      hideChartPanels()
      hideSectorPanels()
      resetSeeMore()
      showChart(chartID,
                this.props.dataURL,
                sectorChartID,
                this.props.sectorDataURL,
                sectorTitleID,
                this.props.chartsConfig)
      toggleChartPanel(true, id)
      // toggle see more icon direction and copy
      $seeMoreIcon.removeClass('glyphicon-chevron-down')
      $seeMoreIcon.addClass('glyphicon-chevron-up')
      $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see less')
      if (this.props.sector) {
        toggleSectorPanel(sectorID)
      }
    } else {
      toggleChartPanel(false, id)
      // toggle see more icon direction copy
      $seeMoreIcon.removeClass('glyphicon-chevron-up')
      $seeMoreIcon.addClass('glyphicon-chevron-down')
      $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see more')
      if (this.props.sector) {
        toggleSectorPanel(sectorID)
      }
    }
  },

  render () {
    var boxType = this.props.boxType
    var headline = this.props.headline
    var content = this.props.content
    var footer = this.props.footer
    var trend = this.props.trend
    var idName = this.props.idName
    var date = this.props.date
    var maxBoxes = this.props.maxBoxes

    var trendIcon = ''
    var iconName = ''
    if (trend === 'down') {
      iconName = 'images/down_arrow.svg'
      trendIcon = (<img src={iconName} />)
    } else if (trend === 'up') {
      iconName = 'images/up_arrow.svg'
      trendIcon = (<img src={iconName} />)
    }

    var boxClassNames = ' dashboardBox chart-col '

    switch (maxBoxes) {
      case 3:
        boxClassNames += ' col-xs-5 col-sm-3 col-sm-offset-0 '
        break
      case 4:
        boxClassNames += ' col-xs-5 col-sm-2 col-sm-offset-0 '
        break
      default:
        break
    }

    var footerOut = (<div className={'footerBox-' + boxType + ' dashboard-footer'}><div className={'trend_icon'}>{trendIcon}</div>{footer}</div>)

    return (
      <div className={boxType + boxClassNames}>
        <div id={idName} onClick={this.clickHandler}>
          <div className={'headlineBox-' + boxType + ' dashboard-headline'}>
            {headline}
          </div>
          <div className={'contentBox-' + boxType + ' dashboard-content'}>
            {content}
          </div>
          <div className={'dateBox-' + boxType + ' dashboard-date'}>
            {date}
          </div>
          <div>
            {footerOut}
          </div>
          <div className={'dashboard-date'}>
            from previous year
          </div>
          <div>
            {renderInfoButton(this.props.source, this.props.idName)}
          </div>
          <div>
            {renderDetailsButton(this.props.details, this.props.idName)}
          </div>
        </div>
      </div>
    )
  }
})

export { Box }
