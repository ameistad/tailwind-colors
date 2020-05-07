<template>
  <main class="flex flex-col min-h-screen mx-4 lg:mx-12" id="app">
    <header class="flex justify-between items-center my-12">
      <div class="flex items-center">
        <logo class="w-6 h-6 md:w-12 md:h-12 mr-2" />
        <h1 class="text-xl md:text-4xl font-bold">Tailwind colors</h1>
      </div>
    </header>

    <div class="flex-grow flex flex-col md:flex-row">
      <div class="md:w-1/2 lg:w-2/3">
        <div class="mb-6">
          <add-color @add-color="handleAddColor" />
        </div>
        <draggable v-model="colors" handle="#color-draggable-handle">
          <color-group
            v-for="(color, index) in colors"
            :key="index"
            :color="{ ...color, index }"
            :colors-length="colors.length"
            @update-color="handleUpdateColor"
            @update-shades="handleUpdateShades"
            @delete="handleDelete"
          />
        </draggable>
      </div>
      <div class="md:1/2 lg:w-1/3">
        <color-config :colors="colors" @add-config="handleAddConfig" />
      </div>
    </div>
    <footer class="flex flex-col md:flex-row justify-between py-12 px-4">
      <div class="flex">
        <div class="mr-4">
          <a
            href="https://twitter.com/ameistad?ref_src=twsrc%5Etfw"
            class="twitter-follow-button"
            data-via="ameistad"
            data-related="tailwindcss"
            data-show-count="false"
            >Follow @ameistad</a
          >
        </div>
        <div>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-via="ameistad"
            data-related="tailwindcss"
            data-show-count="false"
            >Tweet</a
          >
        </div>
      </div>
      <div class="text-sm">
        Post issues and feedback at the
        <a href="https://www.github.com/ameistad/tailwind-colors" class="underline text-blue-800">Github repository</a>.
      </div>
    </footer>
  </main>
</template>

<script>
import Draggable from 'vuedraggable'
import Logo from '@/components/Logo'
import ColorGroup from '@/components/ColorGroup'
import ColorConfig from '@/components/ColorConfig'
import AddColor from '@/components/AddColor'

export default {
  name: 'app',
  components: {
    Draggable,
    Logo,
    ColorGroup,
    ColorConfig,
    AddColor
  },
  data() {
    return {
      colors: []
    }
  },
  methods: {
    handleAddColor(color) {
      this.colors = [color, ...this.colors]
    },
    handleUpdateColor(color) {
      this.$set(this.colors, color.index, color)
    },
    handleUpdateShades({ colorIndex, shades }) {
      this.colors[colorIndex].shades = shades
    },
    handleDelete(colorIndex) {
      this.colors.splice(colorIndex, 1)
    },
    handleAddConfig(colors) {
      this.colors = [...colors, ...this.colors]
    }
  },
  mounted() {
    this.$ga.page('/')
  }
}
</script>
