<template>
  <rect width="15" height="15"
    v-bind:x="x"
    v-bind:y="y"
    v-bind:fill="fill"></rect>
</template>

<script>
export default {
  name: 'cell',
  computed: {
    x() {
      return 50 + (20 * this.column)
    },
    y() {
      return 50 + (20 * this.row)
    },
    fill() {
      return this.alive ? '#6FF118' : '#999'
    }
  },
  props: {
    alive: Boolean,
    index: Number,
    row: Number,
    column: Number
  }
}
</script>
