<template>
  <dd id="d3-participation-streak-graph">
    <svg width="650" height="300">
      <template v-for="(row, y) in field">
        <cell v-for="(alive, x) in row"
              v-bind:alive="alive"
              v-bind:row="y"
              v-bind:column="x"></cell>
      </template>
      <scale-mark v-for="(v, i) in scaleMarks"
                  v-bind:scale-value="v"
                  v-bind:index="i">
      </scale-mark>
    </svg>
    <div class="gol-controller">
      <button v-on:click="start">Start</button>
      <button v-on:click="stop">Stop</button>
      <button v-on:click="reset">Reset</button>
    </div>
  </dd>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
import Cell from './components/Cell.vue'
import ScaleMark from './components/ScaleMark.vue'
import * as mTypes from './store/mutation-types'
import * as aTypes from './store/action-types'

export default {
  name: 'app',
  computed: mapState({
    field: state => state.field,
    ...mapGetters([
      'scaleMarks'
    ])
  }),
  methods: {
    ...mapMutations({
      stop: mTypes.STOP
    }),
    ...mapActions({
      start: aTypes.START,
      reset: aTypes.RESET
    })
  },
  components: {
    Cell,
    ScaleMark
  }
}
</script>

<style>
.gol-controller {
  text-align: center;
}
</style>
