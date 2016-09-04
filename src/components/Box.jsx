
/* eslint no-unused-vars: [2, { "varsIgnorePattern": "Props" }] */
/* eslint max-len: [2, 250, 4] */

import React, { PropTypes } from 'react'

import dataTags from '../utilities/constants'
import InfoButton from './InfoButton'
import DetailsButton from './DetailsButton'
import BoxIndicator from './BoxIndicator'

const getBoxClassNames = (maxBoxes) => {
  let boxClassNames = ' dashboardBox chart-col '

  switch (maxBoxes) {
    case 3:
      boxClassNames += ' col-xs-5 col-sm-3 col-sm-offset-0 '
      break
    case 4:
    default:
      boxClassNames += ' col-xs-5 col-sm-2 col-sm-offset-0 '
      break
  }
  return boxClassNames
}

class Box extends React.Component {
  clickHandler = (e) => {
    this.props.clickHandler(e, this.props.item)
  }
  render() {
    const boxType = this.props.boxType
    const headline = this.props.item.name
    const content = this.props.item.value
    const footer = this.props.item[dataTags.changeFromPrevYear]
    const trend = this.props.item.trend
    const idName = this.props.item.id
    const date = this.props.item.date
    const source = this.props.item.source
    const details = this.props.item.detail1
    const maxBoxes = this.props.maxBoxes

    const boxClassNames = getBoxClassNames(maxBoxes)

    return (
      <div className={boxType + boxClassNames}>
        <div id={idName} onClick={this.clickHandler} >
          <BoxIndicator
            headline={headline}
            content={content}
            date={date}
            boxType={boxType}
            footer={footer}
            trend={trend}
          />
          <InfoButton source={source} idName={idName} />
          <DetailsButton details={details} idName={idName} />
        </div>
      </div>
    )
  }
}

Box.propTypes = {
  boxType: PropTypes.string.isRequired,
  maxBoxes: PropTypes.number.isRequired,
  item: PropTypes.object,
  clickHandler: PropTypes.func.isRequired
}

export default Box
