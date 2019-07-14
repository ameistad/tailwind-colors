<template>
  <main class="flex flex-col min-h-screen mx-4 lg:mx-12" id="app">
    <header class="flex justify-between items-center my-12">
      <div class="flex items-center">
        <logo class="w-12 h-12 mr-2" />
        <h1 class="text-4xl font-semibold">tailwind colors</h1>
      </div>
      <div>
        <a href="https://github.com/ameistad/tailwind-colors">
          <icon-base
          icon-name="Github"
          >
            <icon-github />
          </icon-base>
        </a>
      </div>
    </header>

    <div class="flex-grow flex flex-col md:flex-row">
      <div class="w-2/3">
        <div class="mb-6">
          <add-color @add-color="handleAddColor" />
        </div>
        <draggable
          v-model="colors"
          handle="#color-draggable-handle"
        >
          <color-group
            v-for="(color, index) in colors"
            :key="index"
            :color="{ ...color, index }"
            :colors-length="colors.length"
            @update-color="handleUpdateColor"
            @add-shade="handleAddShade"
            @update-shade="handleUpdateShade"
            @delete="handleDelete"
          />
        </draggable>
      </div>
      <div class="w-1/3">
        <color-config
          :colors="colors"
          @add-config="handleAddConfig"
        />
      </div>
    </div>
    <footer class="py-8 text-center">
      <a
        href="https://www.meidev.co"
      >
        <icon-base
          height="15"
          width="15"
        >
          <icon-meidev />
        </icon-base>
        mei<span class="font-bold">dev</span>
      </a>
      <p class="text-sm my-4">
        Comments and issues are very welcome, post them at <a href="https://www.github.com/ameistad/tailwind-colors" class="underline text-blue-800">Github repository</a>.
      </p>
    </footer>
  </main>
</template>

<script>
import Draggable from 'vuedraggable'
import Logo from '@/components/Logo'
import ColorGroup from '@/components/ColorGroup'
import ColorConfig from '@/components/ColorConfig'
import AddColor from '@/components/AddColor'
import IconBase from '@/components/icons/IconBase'
import IconGithub from '@/components/icons/IconGithub'
import IconMeidev from '@/components/icons/IconMeidev'

export default {
  name: 'app',
  components: {
    Draggable,
    Logo,
    ColorGroup,
    ColorConfig,
    AddColor,
    IconBase,
    IconGithub,
    IconMeidev
  },
  data () {
    return {
      colors: []
    }
  },
  methods: {
    handleAddColor (color) {
      this.colors.unshift(color)
    },
    handleUpdateColor (color) {
      this.$set(this.colors, color.index, color)
    },
    handleAddShade (colorIndex) {
      const color = this.colors[colorIndex]
      const lastShadeNumber = [...color.shades].reverse().find(shade => typeof shade.name === 'number')
      if (lastShadeNumber) {
        this.colors[colorIndex].shades.push({ name: lastShadeNumber.name + 100, hexCode: '#474747' })
      } else if (color.shades.length === 1 && !color.shades[0].name) {
        const shades = [
          { name: 100, hexCode: color.shades[0].hexCode },
          { name: 200, hexCode: '#474747' }
        ]
        this.colors[colorIndex].shades = shades
      } else {
        this.colors[colorIndex].shades.push({ name: '', hexCode: '#474747' })
      }
    },
    handleUpdateShade ({ colorIndex, shades }) {
      this.colors[colorIndex].shades = shades
    },
    handleDelete (colorIndex) {
      this.colors.splice(colorIndex, 1)
    },
    handleAddConfig (colors) {
      this.colors = [...colors, ...this.colors]
    }
  }
}
</script>
