/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'

import { Box } from './Box'
import { RowLabel } from './RowLabel'

class BoxGroup extends React.Component {
  render () {
    var title = this.props.labelTitle
    title = title.toUpperCase()

    var boxes = this.props.data.map((item) => {
      var uuid = item.id

      return (
        <Box boxType={this.props.labelClass}
          key={uuid}
          maxBoxes={this.props.maxBoxes}
          item={item}
          clickHandler={this.props.detailsEventHandler}
        />
      )
    })

    return (
      <div>
        <div className='row-fluid row-eq-height'>
          <RowLabel
            labelClass={this.props.labelClass}
            labelTitle={title}
          />
          {boxes}
        </div>

      </div>
    )
  }
}

BoxGroup.propTypes = {
  labelClass: PropTypes.string,
  labelTitle: PropTypes.string,
  maxBoxes: PropTypes.number,
  data: PropTypes.array,
  detailsEventHandler: PropTypes.func
}

export { BoxGroup }
