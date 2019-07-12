<template>
  <div class="mr-6 bg-white rounded p-4">
    <div class="flex justify-between mb-6 pr-24">
      <div class="flex items-center">
        <icon-base
          id="color-draggable-handle"
          height="25"
          width="25"
          class="mt-2"
        >
          <icon-drag />
        </icon-base>
        <input
          type="text"
          v-model="name"
          class="text-xl  outline-none"
          @focus="focus = true"
          @focusout="focus = false"
        />
      </div>
      <div class="flex items-center">
        <button
          class="flex items-center mr-6"
          @click="$emit('add-shade', color.index)"
        >
          <icon-base
            icon-name="Add"
            height="20"
            width="20"
          >
            <icon-add />
          </icon-base>
          <span class="text-sm">Add Shade</span>
        </button>
        <button
          @click="$emit('delete', color.index)"
          class="flex items-center"
        >
          <icon-base
            icon-name="Delete"
            height="20"
            width="20 "
          >
            <icon-delete />
          </icon-base>
          <span class="text-sm">Delete Color</span>
        </button>
      </div>
    </div>
    <draggable
      v-model="shades"
      handle="#shade-draggable-handle"
      class="flex flex-wrap"
    >
      <color-shade
        v-for="(shade, index) in color.shades"
        :key="index"
        :shade="{ ...shade, index }"
        :color-name="color.name"
        @update-shade="handleUpdateShade"
        @delete-shade="handleDeleteShade"
      />
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ColorShade from './ColorShade'
import IconBase from '@/components/icons/IconBase'
import IconDrag from '@/components/icons/IconDrag'
import IconAdd from '@/components/icons/IconAdd'
import IconDelete from '@/components/icons/IconDelete'

function capitalize (str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

export default {
  components: {
    Draggable,
    ColorShade,
    IconBase,
    IconDrag,
    IconAdd,
    IconDelete
  },
  props: {
    color: {
      type: Object,
      required: true
    },
    colorsLength: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      focus: false
    }
  },
  computed: {
    name: {
      get () { return this.focus ? this.color.name : capitalize(this.color.name) },
      set (name) { this.$emit('update-color', { ...this.color, name }) }
    },
    shades: {
      get () { return this.color.shades },
      set (shades) { this.$emit('update-shade', { colorIndex: this.color.index, shades }) }
    }
  },
  methods: {
    handleUpdateShade (shade) {
      const shades = [...this.color.shades]
      shades[shade.index] = shade
      this.$emit('update-shade', { colorIndex: this.color.index, shades })
    },
    handleDeleteShade (shadeIndex) {
      this.color.shades.splice(shadeIndex, 1)
      this.$emit('update-color', this.color)
    }
  }
}
</script>
