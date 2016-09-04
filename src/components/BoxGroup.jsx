/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'

import Box from './Box'
import RowLabel from './RowLabel'

const BoxGroup = (props) => {
  let title = props.labelTitle
  title = title.toUpperCase()

  const boxes = props.data.map((item) => {
    return (
      <Box
        boxType={props.labelClass}
        key={item.id}
        maxBoxes={props.maxBoxes}
        item={item}
        clickHandler={props.detailsEventHandler}
      />
    )
  })

  return (
    <div>
      <div className='row-fluid row-eq-height'>
        <RowLabel
          labelClass={props.labelClass}
          labelTitle={title}
        />
        {boxes}
      </div>
    </div>
  )
}

BoxGroup.propTypes = {
  labelClass: PropTypes.string,
  labelTitle: PropTypes.string,
  maxBoxes: PropTypes.number,
  data: PropTypes.array,
  detailsEventHandler: PropTypes.func
}

export default BoxGroup
