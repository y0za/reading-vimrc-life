import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  field: [],
  initialCells: [],
  rowCount: 0,
  running: false
}

const mutations = {
  start(state) {
    state.running = true
  },
  stop(state) {
    state.running = false
  },
  resetField(state) {
    state.field = createField(state.initialCells, state.rowCount)
  },
  nextField(state) {
    let field = []
    for (let y = 0; y < field.length; y++) {
      field.push([])
      for (let x = 0; x < field[y].length; x++) {
        const aroundAlives = aroundAlivesCount(state.field, y, x)
        const alive = nextAlive(state.field[y][x], aroundAlives)
        field[y].push(alive)
      }
    }
    state.field = field
  },
  setInitialState(state, { cells, rowCount }) {
    state.field = createField(cells, rowCount)
    state.initialCells = cells
    state.rowCount = rowCount
  }
}

function createField(cells, rowCount) {
  let field = []

  for (let i = 0; i < cells.length; i++) {
    if (i % rowCount === 0) {
      field.push([])
    }
    field[field.length - 1].push(cells[i])
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

export default new Vuex.Store({
  state,
  mutations
})