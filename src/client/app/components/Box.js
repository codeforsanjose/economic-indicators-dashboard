/* @flow */
/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'

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
  clickHandler: PropTypes.func
};

export var Box = React.createClass({
  propTypes: {
    boxType: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string,
    content: React.PropTypes.string,
    footer: React.PropTypes.string,
    trend: React.PropTypes.string,
    idName: React.PropTypes.string,
    date: React.PropTypes.string,
    clickHandler: React.PropTypes.func
  },
  renderDetailsButton () {
    if (this.props.headline === 'Total Jobs') {
      return (
        <div className={'dashboard-box__more-details'}><span className='dashboard-box__more-details-copy'>see more </span><span className='glyphicon glyphicon-triangle-bottom'></span></div>
      )
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

    var trendIcon = ''
    var iconName = ''
    if (trend === 'down') {
      iconName = 'images/down_arrow.svg'
      trendIcon = (<img src={iconName}/>)
    } else if (trend === 'up') {
      iconName = 'images/up_arrow.svg'
      trendIcon = (<img src={iconName}/>)
    }
    var footerOut = (<div className={'footerBox-' + boxType + ' dashboard-footer'}><div className={'trend_icon'}>{trendIcon}</div>{footer}</div>)

    return (
      <div className={boxType + ' dashboardBox chart-col col-xs-5 col-sm-3 col-sm-offset-0'}>
        <div id={idName} onClick={this.props.clickHandler}>
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
            {this.renderDetailsButton()}
          </div>
        </div>
      </div>
    )
  }
})
