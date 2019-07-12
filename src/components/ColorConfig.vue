<template>
  <div>
    <div class="flex justify-between mx-12 text-xs">
      <div class="flex">
        <button
          :class="{ 'bg-gray-800 text-gray-100': override }"
          class="rounded-t py-1 px-4  cursor-pointer focus:outline-none"
          @click="override = true"
        >
          Override
        </button>
        <button
          :class="{ 'bg-gray-800 text-gray-100': !override }"
          class="rounded-t py-1 px-4 cursor-pointer focus:outline-none"
          @click="override = false"
        >
          Extend
        </button>
      </div>
      <div class="flex items-center">
        <load-config @add-config="handleAddConfig" />
        <button
          class="mr-2"
          @click="copyTailwindConfig"
        >
          Copy
        </button>
        <button @click="saveTailwindConfig">
          Save
        </button>
      </div>
    </div>
    <prism language="javascript">
// tailwind.config.js
{{ tailwindConfig }}
    </prism>
  </div>
</template>

<script>
import Prism from 'vue-prism-component'
import LoadConfig from '@/components/LoadConfig'

function createTailwindConfig (colors, options) {
  // Add whitespace
  function addW (str, w) {
    return str.padStart(str.length + w)
  }

  let colorConfig = ''
  colorConfig += 'module.exports = {\n'
  colorConfig += addW('theme: {\n', 2)

  if (!options.override) {
    colorConfig += addW('extend: {\n', 4)
  }

  // Adding colors
  const indent = options.override ? 4 : 6

  colorConfig += addW('colors: {\n', indent)
  colors.forEach((color, index) => {
    colorConfig += addW(`${color.name}`, indent + 2)
    if (color.shades.length === 1 && !color.shades[0].name) {
      colorConfig += `: '${color.shades[0].hexCode}'${index === colors.length - 1 ? '' : ','}\n`
    } else {
      colorConfig += ': {\n'
      color.shades.forEach((shade, index) => {
        colorConfig += addW(`${shade.name}: '${shade.hexCode}'${index === color.shades.length - 1 ? '' : ','}\n`, indent + 4)
      })
      colorConfig += addW(`}${index === colors.length - 1 ? '' : ','}\n`, indent + 2)
    }
  })
  colorConfig += addW('}\n', indent)
  if (!options.override) {
    colorConfig += addW('}\n', 4)
  }
  colorConfig += addW('}\n', 2)
  colorConfig += '}'
  return colorConfig
}

export default {
  components: {
    Prism,
    LoadConfig
  },
  props: {
    colors: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      override: true
    }
  },
  computed: {
    tailwindConfig () {
      return createTailwindConfig(this.colors, { override: this.override })
    }
  },
  methods: {
    async copyTailwindConfig () {
      try {
        await navigator.clipboard.writeText(this.tailwindConfig)
      } catch (error) {
        alert(error)
      }
    },
    saveTailwindConfig () {
      const file = new Blob([this.tailwindConfig], { type: 'text/plain' })
      const element = document.createElement('a')
      element.href = URL.createObjectURL(file)
      element.download = `tailwind.config.js`
      element.click()
    },
    handleAddConfig (config) {
      this.$emit('add-config', config)
    }
  }
}
</script>
