import React, { PropTypes } from 'react'

const DetailsButton = (props) => {
  if (props.details !== undefined && props.details.length > 0) {
    return (
      <div
        className={'dashboard-box__more-details'}
        id={`${props.idName}-more-details`}
      >
        <span className='dashboard-box__more-details-copy'>
          see more
        </span>
        <span className='glyphicon glyphicon-chevron-down' />
      </div>
    )
  }
  return <div />
}

DetailsButton.propTypes = {
  idName: PropTypes.string,
  details: PropTypes.string
}

export default DetailsButton
