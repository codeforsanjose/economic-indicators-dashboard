/* @flow */
/*global $:true*/
/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 250, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'
import {showChart} from '../charts/chartUtilities'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  boxType: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
  footer: PropTypes.string,
  source: PropTypes.string,
  trend: PropTypes.string,
  idName: PropTypes.string,
  date: PropTypes.string,
  maxBoxes: PropTypes.number,
  source: PropTypes.string,
  details: PropTypes.string,
  sector: PropTypes.string,
  chartsConfig: React.PropTypes.object
}

export function getPanelID (id) {
  return id + '-chart-panel'
}

export function getChartID (id) {
  return id + '-chart'
}

export function getChartTitleID (id) {
  return id + '-chart-title'
}

export function getSectorTitleID (id) {
  return id + '-sector-title'
}

export function getSectorID (id) {
  return id + '-sector'
}

export var Box = React.createClass({
  propTypes: {
    boxType: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string,
    content: React.PropTypes.string,
    footer: React.PropTypes.string,
    trend: React.PropTypes.string,
    idName: React.PropTypes.string,
    date: React.PropTypes.string,
    maxBoxes: React.PropTypes.number,
    source: React.PropTypes.string,
    details: React.PropTypes.string,
    sector: React.PropTypes.string,
    chartsConfig: React.PropTypes.object
  },

  renderDetailsButton () {
    if (this.props.details !== undefined && this.props.details.length > 0) {
      return (
        <div className={'dashboard-box__more-details'} id={this.props.idName + '-more-details'}><span className='dashboard-box__more-details-copy'>see more </span><span className='glyphicon glyphicon-chevron-down'></span></div>
      )
    }
  },

  renderInfoButton () {
    var tooltipText = 'Source: ' + this.props.source
    var tooltipID = this.props.idName + '-info-tooltip'

    return (
      <div className='tooltip-box'>
        <a data-tip data-for={tooltipID}> <span className='glyphicon glyphicon-info-sign info'></span></a>
        <ReactTooltip place='right' type='info' effect='solid' className='info-tooltip' id={tooltipID}>
          <div className={'tooltip-content'}>
            <span>{tooltipText}</span>
          </div>
        </ReactTooltip>
      </div>
    )
  },

  clickHandler (event) {
    var panelID = getPanelID(event.currentTarget.id)
    var chartID = getChartID(event.currentTarget.id)
    var sectorChartID = getSectorID(event.currentTarget.id)
    var sectorTitleID = getSectorTitleID(event.currentTarget.id)

    // handle the selected panel id
    var id = '#' + panelID
    var $seeMoreIcon = $('#' + event.currentTarget.id).find('.dashboard-box__more-details .glyphicon')
    if ($(id).hasClass('chart-hidden')) {
      showChart(chartID, this.props.details, sectorChartID, this.props.sector, sectorTitleID, this.props.chartsConfig)
      $(id).slideDown()
      // toggle see more icon direction and copy
      $seeMoreIcon.removeClass('glyphicon-chevron-down')
      $seeMoreIcon.addClass('glyphicon-chevron-up')
      $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see less')

      $(id).removeClass('chart-hidden')
      $(id).addClass('chart-visible')
    } else {
      $(id).slideUp()

      // toggle see more icon direction copy
      $seeMoreIcon.removeClass('glyphicon-chevron-up')
      $seeMoreIcon.addClass('glyphicon-chevron-down')
      $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see more')

      $(id).removeClass('chart-visible')
      $(id).addClass('chart-hidden')
    }
  },

  render: function () {
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
            as of {date}
          </div>
          <div>
            {footerOut}
          </div>
          <div>
            {this.renderInfoButton()}
          </div>
          <div>
            {this.renderDetailsButton()}
          </div>
        </div>
      </div>
    )
  }
})
