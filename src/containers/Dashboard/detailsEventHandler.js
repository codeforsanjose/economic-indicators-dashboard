/*global $:true*/

import { showChart } from '../../charts/chartUtilities'
import { chartTypes, getChartID } from '../../utilities/chartIDs'

const hideSectorPanels = () => {
  const visibleElements = $.find('.sector-visible')
  visibleElements.forEach((value) => {
    $(value).slideUp()
    $(value).removeClass('sector-visible')
    $(value).addClass('sector-hidden')
  })
}

const resetSeeMore = () => {
  const visibleElements = $.find('.dashboard-box__more-details .glyphicon')
  visibleElements.forEach((value) => {
    $(value).removeClass('glyphicon-chevron-up')
    $(value).addClass('glyphicon-chevron-down')
    $(value).siblings('.dashboard-box__more-details-copy').text('see more')
  })
}

const hideChartPanels = () => {
  const visibleElements = $.find('.chart-visible')
  visibleElements.forEach((value) => {
    $(value).slideUp()
    $(value).removeClass('chart-visible')
    $(value).addClass('chart-hidden')
  })
}

const toggleSectorPanel = (sectorID) => {
  if ($(sectorID).hasClass('chart-hidden')) {
    $(sectorID).slideDown()
    $(sectorID).removeClass('chart-hidden')
    $(sectorID).addClass('chart-visible')
  } else {
    $(sectorID).slideUp()
    $(sectorID).removeClass('chart-visible')
    $(sectorID).addClass('chart-hidden')
  }
}

const toggleChartPanel = (show, id) => {
  if (show) {
    $(id).slideDown()
    $(id).removeClass('chart-hidden')
    $(id).addClass('chart-visible')
  } else {
    $(id).slideUp()
    $(id).removeClass('chart-visible')
    $(id).addClass('chart-hidden')
  }
}

export const detailsEventHandler = (eventID, dataURL, sectorDataURL, chartsConfig, sector) => {
  const panelID = getChartID(eventID, chartTypes.chartPanel)
  const chartID = getChartID(eventID, chartTypes.chartID)
  const sectorChartID = getChartID(eventID, chartTypes.sector)
  const sectorTitleID = getChartID(eventID, chartTypes.sectorTitle)
  const sectorPanelID = getChartID(eventID, chartTypes.sectorPanel)
  // handle the selected panel id
  const id = '#' + panelID
  const sectorID = '#' + sectorPanelID
  const $seeMoreIcon = $('#' + eventID).find('.dashboard-box__more-details .glyphicon')
  if ($(id).hasClass('chart-hidden')) {
    hideChartPanels()
    hideSectorPanels()
    resetSeeMore()
    showChart(chartID,
              dataURL,
              sectorChartID,
              sectorDataURL,
              sectorTitleID,
              chartsConfig)
    toggleChartPanel(true, id)
    // toggle see more icon direction and copy
    $seeMoreIcon.removeClass('glyphicon-chevron-down')
    $seeMoreIcon.addClass('glyphicon-chevron-up')
    $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see less')
    if (sector) {
      toggleSectorPanel(sectorID)
    }
  } else {
    toggleChartPanel(false, id)
    // toggle see more icon direction copy
    $seeMoreIcon.removeClass('glyphicon-chevron-up')
    $seeMoreIcon.addClass('glyphicon-chevron-down')
    $seeMoreIcon.siblings('.dashboard-box__more-details-copy').text('see more')
    if (sector) {
      toggleSectorPanel(sectorID)
    }
  }
}
