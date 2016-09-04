import React, { PropTypes } from 'react'

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

class BoxIndicator extends React.Component {
  render () {
    const boxType = this.props.boxType
    const trendIcon = getTrendIcon(this.props.trend)

    return (
      <div>
        <div className={'headlineBox-' + boxType + ' dashboard-headline'}>
          {this.props.headline}
        </div>
        <div className={'contentBox-' + boxType + ' dashboard-content'}>
          {this.props.content}
        </div>
        <div className={'dateBox-' + boxType + ' dashboard-date'}>
          {this.props.date}
        </div>
        <div className={'footerBox-' + this.props.boxType + ' dashboard-footer'}>
          <div className={'trend_icon'}>
            {trendIcon}
          </div>
          {this.props.footer}
          <div className={'dashboard-date'}>
            from previous year
          </div>
        </div>
      </div>
    )
  }
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
