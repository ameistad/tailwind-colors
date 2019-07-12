<template>
  <div class="flex items-center mr-4 mb-8 p-1 bg-white rounded shadow">
    <div
      id="shade-draggable-handle"
      :style="{ background: shade.hexCode }"
      class="h-12 w-12 rounded shadow-inner cursor-pointer mr-2"
    />
    <div class="flex flex-col text-xs">
      <input
        v-model="name"
        placeholder="..."
        type="text"
        class="outline-none mb-1"
      />
      <color-picker
        v-model="hexCode"
        class="outline-none mb-1"
      />
    </div>
    <div class="-mt-6 mr-1">
      <button
        @click="$emit('delete-shade', shade.index   )"
      >
        <icon-base
          icon-name="Delete"
          height="20"
          width="20"
        >
          <icon-delete />
        </icon-base>
      </button>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'
import IconBase from '@/components/icons/IconBase'
import IconDelete from '@/components/icons/IconDelete'

export default {
  components: {
    ColorPicker,
    IconBase,
    IconDelete
  },
  props: {
    colorName: {
      type: String,
      required: true
    },
    shade: {
      type: Object,
      required: true
    }
  },
  computed: {
    name: {
      get () { return this.shade.name },
      set (name) { this.$emit('update-shade', { ...this.shade, name }) }
    },
    hexCode: {
      get () { return this.shade.hexCode },
      set (hexCode) { this.$emit('update-shade', { ...this.shade, hexCode }) }
    }
  }
}
</script>
