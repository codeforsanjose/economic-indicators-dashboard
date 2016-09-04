/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'

class RowLabel extends React.Component {
  render () {
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
}

RowLabel.propTypes = {
  labelClass: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired
}

export default RowLabel
