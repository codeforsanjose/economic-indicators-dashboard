const chartIDTypes = {
  chartPanel: '-chart-panel',
  chartID: '-chart',
  chartTitle: '-chart-title',
  sectorTitle: '-sector-title',
  sector: '-sector',
  sectorPanel: '-sectorPanel'
}

export const chartTypes = {
  chartPanel: 'chartPanel',
  chartID: 'chartID',
  chartTitle: 'chartTitle',
  sectorTitle: 'sectorTitle',
  sector: 'sector',
  sectorPanel: 'sectorPanel'
}

export const getChartID = (id, idType) => {
  return `${id}${chartIDTypes[idType]}`
}
