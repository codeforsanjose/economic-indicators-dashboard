import React, { PropTypes } from 'react'

import ReactTooltip from 'react-tooltip'

const InfoButton = (props) => {
  const tooltipText = `Source: ${props.source}`
  const tooltipID = `${props.idName}-info-tooltip`

  return (
    <div className='tooltip-box'>
      <a data-tip data-for={tooltipID}>
        <span className='glyphicon glyphicon-info-sign info' />
      </a>
      <ReactTooltip
        place='right'
        type='info'
        effect='solid'
        className='info-tooltip'
        id={tooltipID}
      >
        <div className='tooltip-content'>
          <span>{tooltipText}</span>
        </div>
      </ReactTooltip>
    </div>
  )
}

InfoButton.propTypes = {
  source: PropTypes.string,
  idName: PropTypes.string
}

export default InfoButton
