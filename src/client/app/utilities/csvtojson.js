import Papa from 'papaparse'
import {dataTags} from '../config/constants'

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

export function convertIndicatorsToJSON (csvData) {
  var indicators = Papa.parse(csvData)

  var indicatorsJSON = {}
  var orderID = -1

  indicators.data.map((row, index, indicatorSet) => {
    // Don't do anything if it is the first row
    if (index === 0) return

    var indicatorItem = convertRow(row, indicatorSet[0])

    if (indicatorItem.data['name'] !== undefined) {
      indicatorItem.data['id'] = indicatorItem.data['name'].toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '-')
      console.log(indicatorItem.data['id'])
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
