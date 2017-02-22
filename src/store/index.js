import Vue from 'vue'
import Vuex from 'vuex'
import * as mTypes from './mutation-types'
import * as aTypes from './action-types'

Vue.use(Vuex)

const state = {
  field: [],
  initialCells: [],
  rowCount: 0,
  running: false
}

const mutations = {
  [mTypes.START](state) {
    state.running = true
  },
  [mTypes.STOP](state) {
    state.running = false
  },
  [mTypes.RESET_FIELD](state) {
    state.field = createField(state.initialCells, state.rowCount)
  },
  [mTypes.NEXT_FIELD](state) {
    let field = []
    for (let y = 0; y < state.field.length; y++) {
      field.push([])
      for (let x = 0; x < state.field[y].length; x++) {
        const aroundAlives = aroundAlivesCount(state.field, y, x)
        const alive = nextAlive(state.field[y][x], aroundAlives)
        field[y].push(alive)
      }
    }
    state.field = field
  },
  [mTypes.SET_INITIAL_STATE](state, { cells, rowCount }) {
    state.field = createField(cells, rowCount)
    state.initialCells = cells
    state.rowCount = rowCount
  }
}

function createField(cells, rowCount) {
  let field = []
  for (let r = 0; r < rowCount; r++) {
    field.push([])
  }

  for (let i = 0; i < cells.length; i++) {
    field[i % rowCount].push(cells[i])
  }

  return field
}

function nextAlive(alive, aroundAlives) {
  if (alive) {
    if (aroundAlives === 2 || aroundAlives === 3) {
      return true
    }
  }

  if (!alive) {
    if (aroundAlives === 3) {
      return true
    }
  }

  return false
}

function aroundAlivesCount(field, row, column) {
  /* eslint-disable no-multi-spaces, standard/array-bracket-even-spacing */
  const arroundOffsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
  ]
  /* eslint-enable no-multi-spaces, standard/array-bracket-even-spacing */

  let alives = 0

  for (let [dy, dx] of arroundOffsets) {
    const [y, x] = [row + dy, column + dx]
    if (y < 0 || y > field.length - 1) {
      continue
    }
    if (field[y][x]) {
      alives += 1
    }
  }

  return alives
}

const actions = {
  [aTypes.START]({ dispatch, commit }) {
    commit(mTypes.START)
    dispatch(aTypes.UPDATE)
  },
  [aTypes.UPDATE]({ dispatch, commit, state }) {
    if (state.running !== true) {
      return
    }
    commit(mTypes.NEXT_FIELD)

    setTimeout(() => {
      dispatch(aTypes.UPDATE)
    }, 500)
  },
  [aTypes.RESET]({ commit }) {
    commit(mTypes.STOP)
    commit(mTypes.RESET_FIELD)
  }
}

const getters = {
  scaleMarks(state) {
    const marksCount = state.initialCells.length / 20
    const interval = 20

    let marks = []
    for (let i = 0; i < marksCount; i++) {
      marks.push(i * interval)
    }
    return marks
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
