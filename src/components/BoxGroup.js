/*eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }]*/
/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import React, { PropTypes } from 'react'
var shortid = require('shortid')

import { Box } from './Box'
import { RowLabel } from './RowLabel'
import { dataTags } from '../utilities/constants'

class BoxGroup extends React.Component {
  render () {
    var title = this.props.labelTitle
    title = title.toUpperCase()

    var boxes = this.props.data.map((item) => {
      var uuid = shortid.generate()

      return (
        <Box boxType={this.props.labelClass}
          headline={item.name}
          content={item.value}
          footer={item[dataTags.changeFromPrevYear]}
          trend={item.trend}
          key={uuid}
          idName={item.id}
          date={item.date}
          details={item.detail1}
          maxBoxes={this.props.maxBoxes}
          source={item.source}
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
