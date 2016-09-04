import React, { PropTypes } from 'react'

class DetailsButton extends React.Component {
  render () {
    if (this.props.details !== undefined && this.props.details.length > 0) {
      return (
        <div
          className={'dashboard-box__more-details'}
          id={this.props.idName + '-more-details'}>
          <span className='dashboard-box__more-details-copy'>
            see more
          </span>
          <span className='glyphicon glyphicon-chevron-down'>
          </span>
        </div>
      )
    } else {
      return <div />
    }
  }
}

DetailsButton.propTypes = {
  idName: PropTypes.string,
  details: PropTypes.string
}

export default DetailsButton
