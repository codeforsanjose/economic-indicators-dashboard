
/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 250, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'

import { dataTags } from '../utilities/constants'

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

const getBoxClassNames = (maxBoxes) => {
  let boxClassNames = ' dashboardBox chart-col '

  switch (maxBoxes) {
    case 3:
      boxClassNames += ' col-xs-5 col-sm-3 col-sm-offset-0 '
      break
    case 4:
    default:
      boxClassNames += ' col-xs-5 col-sm-2 col-sm-offset-0 '
      break
  }
  return boxClassNames
}

const getTrendIcon = (trend) => {
  var trendIcon = ''
  var iconName = ''
  if (trend === 'down') {
    iconName = 'images/down_arrow.svg'
    trendIcon = (<img src={iconName} alt='trend down' />)
  } else if (trend === 'up') {
    iconName = 'images/up_arrow.svg'
    trendIcon = (<img src={iconName} alt='trend up' />)
  }

  return trendIcon
}

class Box extends React.Component {
  clickHandler = (e) => {
    this.props.clickHandler(e, this.props.item)
  }
  render () {
    var boxType = this.props.boxType
    var headline = this.props.item.name
    var content = this.props.item.value
    var footer = this.props.item[dataTags.changeFromPrevYear]
    var trend = this.props.item.trend
    var idName = this.props.item.id
    var date = this.props.item.date
    var source = this.props.item.source
    var details = this.props.item.detail1
    var maxBoxes = this.props.maxBoxes

    const trendIcon = getTrendIcon(trend)
    const boxClassNames = getBoxClassNames(maxBoxes)

    var footerOut = (<div className={'footerBox-' + boxType + ' dashboard-footer'}><div className={'trend_icon'}>{trendIcon}</div>{footer}</div>)

    return (
      <div className={boxType + boxClassNames}>
        <div id={idName} onClick={this.clickHandler} >
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
            {renderInfoButton(source, idName)}
          </div>
          <div>
            {renderDetailsButton(details, idName)}
          </div>
        </div>
      </div>
    )
  }
}

Box.propTypes = {
  boxType: PropTypes.string.isRequired,
  maxBoxes: PropTypes.number.isRequired,
  item: PropTypes.object,
  clickHandler: PropTypes.func.isRequired
}

export { Box }
