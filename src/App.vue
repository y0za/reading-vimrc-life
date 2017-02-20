<template>
  <dd id="d3-participation-streak-graph">
    <svg width="650" height="300">
      <template v-for="(row, y) in field">
        <cell v-for="(alive, x) in row"
          v-bind:alive="alive"
          v-bind:row="y"
          v-bind:column="x"></cell>
      </template>
    </svg>
  </dd>
</template>

<script>
import { mapState } from 'vuex'
import Cell from './components/Cell.vue'

export default {
  name: 'app',
  computed: mapState({
    field: state => state.field
  }),
  components: {
    Cell
  }
}
</script>

<style>
</style>
