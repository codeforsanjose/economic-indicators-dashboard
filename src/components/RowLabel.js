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
  labelClass: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired
};

export var RowLabel = React.createClass({
  propTypes: {
    labelClass: React.PropTypes.string.isRequired,
    labelTitle: React.PropTypes.string.isRequired
  },

  render: function () {
    var labelClass = this.props.labelClass
    var labelTitle = this.props.labelTitle

    return (
      <div className='col-xs-12 col-sm-1'>
        <div className={labelClass + ' dashboard-label dashboard-label'}>
          <div className='image-holder'>
            <div className={labelClass + '-overlay label-overlay'}></div>
            <div className='title'>
              <h4>{labelTitle} </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
