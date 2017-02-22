<template>
  <g style="font-size: 10px;">
    <text v-bind:x="x"
          y="30"
          dy=".71em"
          fill="steelblue"
          style="text-anchor: middle;">
      {{ scaleValue }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'scale-mark',
  computed: {
    x() {
      return 50 + (40 * this.index)
    }
  },
  props: {
    scaleValue: Number,
    index: Number
  }
}
</script>
