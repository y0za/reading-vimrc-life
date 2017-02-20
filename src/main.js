import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as mTypes from './store/mutation-types'

function extractPaticipations() {
  const rectList = document.querySelectorAll('#d3-participation-streak-graph rect')
  const participations = Array.prototype.map.call(rectList, (rect) => {
    return rect.attributes.fill.value !== '#999'
  })
  return participations
}

function init() {
  const dd = document.querySelector('#d3-participation-streak-graph')

  store.commit(mTypes.SET_INITIAL_STATE, {
    cells: extractPaticipations(),
    rowCount: 10
  })

  /* eslint-disable no-new */
  new Vue({
    el: dd,
    render: h => h(App),
    store
  })
  /* eslint-enable no-new */
}

document.addEventListener('DOMContentLoaded', init)

