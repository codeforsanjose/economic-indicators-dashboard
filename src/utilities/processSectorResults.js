import Papa from 'papaparse'

const processSectorResults = (result) => {
  let sectorResults = {}

  const sectorVals = Papa.parse(result)

  const values = result.split('\n')

  const cols = values[0].split(',')
  const numCols = cols.length
  const numRows = sectorVals.data.length

  for (var colIdx = 1; colIdx < numCols; colIdx++) {
    let dataValues = []

    for (let rowIdx = 1; rowIdx < numRows; rowIdx++) {
      if (sectorVals.data[rowIdx][0].trim().length > 0) {
        dataValues.push({
          label: sectorVals.data[rowIdx][0],
          value: parseFloat(sectorVals.data[rowIdx][colIdx])
        })
      }
    }

    var index = cols[colIdx].replace(/"/g, '').replace(/ /g, '-')
    sectorResults[index] = dataValues
  }
  return sectorResults
}

export default processSectorResults
