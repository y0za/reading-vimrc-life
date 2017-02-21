import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as mTypes from './store/mutation-types'

function prepareLife(streakGraph, participations) {
  store.commit(mTypes.SET_INITIAL_STATE, {
    cells: participations,
    rowCount: 10
  })

  /* eslint-disable no-new */
  new Vue({
    el: streakGraph,
    render: h => h(App),
    store
  })
  /* eslint-enable no-new */
}

function extractPaticipations(rectList) {
  const participations = Array.prototype.map.call(rectList, (rect) => {
    return rect.attributes.fill.value !== '#999'
  })
  return participations
}

const streakGraphId = 'd3-participation-streak-graph'

const observer = new MutationObserver((mutations) => {
  const rectList = document.querySelectorAll(`#${streakGraphId} rect`)
  if (rectList.length === 0) {
    return
  }

  const streakGraph = document.getElementById(streakGraphId)
  const participations = extractPaticipations(rectList)
  prepareLife(streakGraph, participations)

  observer.disconnect()
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
})
