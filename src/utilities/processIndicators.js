/*eslint max-len: [2, 200, 4]*/ // extend the maximum allowed characters

import Papa from 'papaparse'
import _ from 'lodash'

import { dataTags } from '../config/constants'
import { constructOpenDataURL } from '../config/dataURLs'

function convertRow (row, heading) {
  var result = {}
  var data = {}

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
  })

  result.key = row[0]
  result.data = data

  return result
}

function convertIndicatorsToJSON (csvData) {
  var indicators = Papa.parse(csvData)

  var indicatorsJSON = {}
  var orderID = -1

  indicators.data.map((row, index, indicatorSet) => {
    // Don't do anything if it is the first row
    if (index === 0) return

    var indicatorItem = convertRow(row, indicatorSet[0])

    if (indicatorItem.data['name'] !== undefined) {
      indicatorItem.data['id'] = indicatorItem.data['name'].toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '-')
    }

    if (indicatorsJSON.hasOwnProperty(indicatorItem.key)) {
      (indicatorsJSON[indicatorItem.key]).push(indicatorItem.data)
    } else {
      var indicatorArray = []
      orderID += 1
      indicatorItem['order'] = orderID
      indicatorArray.push(indicatorItem.data)
      indicatorsJSON[indicatorItem.key] = indicatorArray
    }
  })

  return indicatorsJSON
}

// ToDo convert to use map
export const processIndicators = (state, csvdata) => {
  let indicators = convertIndicatorsToJSON(csvdata)
  _.forIn(indicators, (set) => {
    _.forIn(set, (item) => {
      if (item.detail1) {
        var newDetail1 = constructOpenDataURL(state.generalConfig.data['open-data-url'],
                                               item.detail1,
                                               state.generalConfig.data['api-key'])
        item.dataURL = newDetail1
      }
      if (item.detail2) {
        var newDetail2 = constructOpenDataURL(state.generalConfig.data['open-data-url'],
                                                item.detail2,
                                                state.generalConfig.data['api-key'])
        item.sectorDataURL = newDetail2
      }
    })
  })
  return indicators
}
