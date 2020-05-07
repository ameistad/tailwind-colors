<template>
  <div class="flex text-sm">
    <template v-if="color.shades.length">
      <button class="flex items-center mr-6" @click="addShade('add-lighter')">
        <icon-base icon-name="Add" height="20" width="20">
          <icon-add />
        </icon-base>
        Lighter shade
      </button>
      <button class="flex items-center mr-6" @click="addShade('add-darker')">
        <icon-base icon-name="Add" height="20" width="20">
          <icon-add />
        </icon-base>
        Darker shade
      </button>
    </template>
    <template v-else>
      <button class="flex items-center mr-6" @click="addShade('add-darker')">
        <icon-base icon-name="Add" height="20" width="20">
          <icon-add />
        </icon-base>
        Add shade
      </button>
    </template>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase'
import IconAdd from '@/components/icons/IconAdd'

// Lighten or darkens a color.
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function adjustShade(color, level) {
  // Remove pound
  color = color.slice(1)

  // Fill with first hexnumber
  color = color.padEnd(6, color.charAt(0))

  let R = parseInt(color.substring(0, 2), 16)
  let G = parseInt(color.substring(2, 4), 16)
  let B = parseInt(color.substring(4, 6), 16)

  // to make the color less bright than the input
  // change the following three '+' symbols to '-'
  R = R + level
  G = G + level
  B = B + level

  R = R > 255 ? 255 : R
  R = R < 0 ? 0 : R

  G = G > 255 ? 255 : G
  G = G < 0 ? 0 : G

  B = B > 255 ? 255 : B
  B = B < 0 ? 0 : B

  let RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
  let GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
  let BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

// Convert a string, for example red to #ff00000
// https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
function standardizeColor(color) {
  let context = document.createElement('canvas').getContext('2d')
  context.fillStyle = color
  return context.fillStyle
}

export default {
  components: {
    IconBase,
    IconAdd
  },
  props: {
    color: {
      type: Object,
      required: true
    }
  },
  methods: {
    addShade(shadeAction) {
      if (this.color.shades.length && !this.color.shades[0].name) {
        this.$emit('update-shades', [{ name: 100, hexCode: this.color.shades[0].hexCode }])
      }

      if (this.color.shades.length) {
        if (shadeAction === 'add-lighter') {
          const firstShade = this.color.shades[0]
          const name =
            typeof firstShade.name === 'number'
              ? firstShade.name > 100
                ? firstShade.name - 100
                : firstShade.name - 10
              : ''
          console.log(typeof firstShade.name)
          this.$emit('update-shades', [{ name, hexCode: adjustShade(firstShade.hexCode, 20) }, ...this.color.shades])
        }
        if (shadeAction === 'add-darker') {
          const lastShade = this.color.shades[this.color.shades.length - 1]
          const name = typeof lastShade.name === 'number' ? lastShade.name + 100 : ''
          this.$emit('update-shades', [...this.color.shades, { name, hexCode: adjustShade(lastShade.hexCode, -20) }])
        }
      } else {
        this.$emit('update-shades', [...this.color.shades, { name: '', hexCode: standardizeColor(this.color.name) }])
      }
    }
  }
}
</script>
