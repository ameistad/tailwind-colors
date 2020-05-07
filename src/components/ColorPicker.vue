<template>
  <dropdown>
    <template slot="dropdown-trigger">
      <input :value="value" type="text" @input="$emit('input', $event.target.value)" class="focus:outline-none" />
    </template>
    <template slot="dropdown-content">
      <sketch :value="value" :presetColors="presetColors" class="color-picker" @input="handleInput" />
    </template>
  </dropdown>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import { Sketch } from 'vue-color'
import defaultConfig from '@/data/defaultConfig'

function getPresetColorsFromConfig(config) {
  let presetColors = []
  for (const color in config) {
    switch (typeof config[color]) {
      case 'string':
        presetColors.push(config[color])
        break
      case 'object':
        if (config[color]['500']) {
          presetColors.push(config[color]['500'])
        }
        break
    }
  }
  return presetColors
}
export default {
  components: {
    Dropdown,
    Sketch
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      presetColors: getPresetColorsFromConfig(defaultConfig)
    }
  },
  methods: {
    handleInput(color) {
      this.$emit('input', color.hex)
    }
  }
}
</script>
