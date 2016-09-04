import React, { PropTypes } from 'react'

const getTrendIcon = (trend) => {
  let trendIcon = ''
  let iconName = ''
  if (trend === 'down') {
    iconName = 'images/down_arrow.svg'
    trendIcon = (
      <img
        src={iconName}
        alt='trend down'
      />)
  } else if (trend === 'up') {
    iconName = 'images/up_arrow.svg'
    trendIcon = (
      <img
        src={iconName}
        alt='trend up'
      />)
  }

  return trendIcon
}

const BoxIndicator = (props) => {
  const boxType = props.boxType
  const trendIcon = getTrendIcon(props.trend)

  return (
    <div>
      <div className={`headlineBox-${boxType} dashboard-headline`}>
        {props.headline}
      </div>
      <div className={`contentBox-${boxType} dashboard-content`}>
        {props.content}
      </div>
      <div className={`dateBox-${boxType} dashboard-date`}>
        {props.date}
      </div>
      <div className={`footerBox-${props.boxType} dashboard-footer`}>
        <div className={'trend_icon'}>
          {trendIcon}
        </div>
        {props.footer}
        <div className={'dashboard-date'}>
          from previous year
        </div>
      </div>
    </div>
  )
}

BoxIndicator.propTypes = {
  boxType: PropTypes.string,
  headline: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  footer: PropTypes.string,
  trend: PropTypes.string
}

export default BoxIndicator
