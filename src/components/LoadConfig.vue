<template>
  <dropdown
    trigger-css-class="inline-flex items-center focus:outline-none mr-2"
    :close-when-clicked="true"
  >
    <template
      slot="dropdown-trigger"
    >
      Load
    </template>
    <template slot="dropdown-content">
      <div  class="bg-white rounded shadow">
        <ul>
          <li>
            <button
              @click="$emit('add-config', createColorArray(defaultConfig))"
              class="flex focus:outline-none hover:bg-gray-200 py-2 px-4 w-full"
            >
              Default Config
            </button>
          </li>
          <li>
            <button
              class="flex focus:outline-none hover:bg-gray-200 py-2 px-4 w-full"
              @click="$refs.selectConfig.click()"
            >
              Import tailwind config
            </button>
          </li>
        </ul>
      </div>
      <input
          hidden
          ref="selectConfig"
          type="file"
          accept="text/javascript"
          @change="handleSelectLocalConfig"
      >
    </template>
  </dropdown>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import defaultConfig from '@/data/defaultConfig'

function createColorArray (colors) {
  const inputColors = []
  for (const color in colors) {
    if (typeof colors[color] === 'object') {
      const shades = []
      for (const shade in colors[color]) {
        shades.push({ name: isNaN(shade) ? shade : Number(shade), hexCode: colors[color][shade] })
      }
      inputColors.push({ name: color, shades })
    } else {
      inputColors.push({ name: color, shades: [{ name: '', hexCode: colors[color] }] })
    }
  }
  return inputColors
}

export default {
  components: {
    Dropdown
  },
  data () {
    return {
      defaultConfig,
      loadedConfig: {}
    }
  },
  methods: {
    handleSelectLocalConfig () {
      function configParse (text) {
        text = text.replace(/module.exports = /, '')
        /* eslint-disable no-new-func */
        return Function('return (' + text + ')')()
      }
      const file = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const config = configParse(event.target.result)
        const colorConfig = createColorArray(config.theme.hasOwnProperty('extend') ? config.theme.extend.colors : config.theme.colors)
        this.$emit('add-config', colorConfig)
      }
      fileReader.readAsText(file)
    },
    createColorArray
  }
}
</script>
