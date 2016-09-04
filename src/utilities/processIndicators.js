/* eslint max-len: [2, 200, 4] */

import Papa from 'papaparse'
import _ from 'lodash'

import dataTags from './constants'
import { constructDataURL } from './dataURLs'

const convertRow = (row, heading) => {
  const result = {}
  const data = {}

  heading.map((item, index) => {
    if (row[index] !== 'TBD' && row[index] !== undefined) {
      data[item] = row[index].replace(/"/g, '').trim()
    }

    // Add the trend and remove the minus indicator
    if (item === dataTags.changeFromPrevYear) {
      if (data[item] !== undefined) {
        if (data[item].indexOf('-') === -1) {
          data[dataTags.trend] = dataTags.up
        } else {
          data[dataTags.trend] = dataTags.down
          data[item] = data[item].replace(/-/g, '')
        }
      }
    }
    // ToDo - refactor to create array from
    // returned values
    return null
  })

  result.key = row[0]
  result.data = data

  return result
}

const convertIndicatorsToJSON = (csvData) => {
  const indicators = Papa.parse(csvData)

  const indicatorsJSON = {}
  let orderID = -1

  indicators.data.map((row, index, indicatorSet) => {
    // Don't do anything if it is the first row
    if (index === 0) {
      return null
    }

    const indicatorItem = convertRow(row, indicatorSet[0])

    if (indicatorItem.data.name !== undefined) {
      indicatorItem.data.id = indicatorItem.data.name.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '-')
    }

    if (indicatorsJSON.hasOwnProperty(indicatorItem.key)) {
      (indicatorsJSON[indicatorItem.key]).push(indicatorItem.data)
    } else {
      const indicatorArray = []
      orderID += 1
      indicatorItem.order = orderID
      indicatorArray.push(indicatorItem.data)
      indicatorsJSON[indicatorItem.key] = indicatorArray
    }
    // ToDo - refactor to create array from
    // returned values
    return null
  })

  return indicatorsJSON
}

// ToDo convert to use map
const processIndicators = (generalConfig, csvdata) => {
  const indicators = convertIndicatorsToJSON(csvdata)
  _.forIn(indicators, (set) => {
    _.forIn(set, (item) => {
      /* eslint-disable no-param-reassign */
      if (item.detail1) {
        const newDetail1 = constructDataURL(generalConfig.data, item.detail1)
        item.dataURL = newDetail1
      }
      if (item.detail2) {
        const newDetail2 = constructDataURL(generalConfig.data, item.detail2)
        item.sectorDataURL = newDetail2
      }
      /* eslint-enable no-param-reassign */
    })
  })
  return indicators
}

export default processIndicators
