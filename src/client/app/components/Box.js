/* @flow */
/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
import React, { PropTypes } from 'react'

// import { connect } from 'react-redux'
// import { increment, doubleAsync } from '../../redux/modules/counter'
// import DuckImage from './Duck.jpg'
// import classes from './HomeView.scss'

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
  source: PropTypes.string
};

export var Box = React.createClass({
  propTypes: {
    boxType: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string,
    content: React.PropTypes.string,
    footer: React.PropTypes.string
  },

  render: function () {
    var boxType = this.props.boxType
    var headline = this.props.headline
    var content = this.props.content
    var footer = this.props.footer

    if (footer && footer.trim().length > 0) {
      var footerOut = (<div className={'footerBox-' + boxType + ' dashboard-footer'}>{footer}</div>)
    }

    return (
      <div>
        <div className={boxType + ' dashboardBox'}>
          <div className={'headlineBox-' + boxType + ' dashboard-headline'}>
            {headline}
          </div>
          <div className={'contentBox-' + boxType + ' dashboard-content'}>
            {content}
          </div>
          {footerOut}
        </div>
      </div>
    )
  }
})
