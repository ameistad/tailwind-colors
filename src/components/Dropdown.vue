<template>
  <div>
    <button ref="trigger" :class="triggerCssClass" @click="open">
      <slot name="dropdown-trigger" />
    </button>
    <div
      v-show="isOpen"
      ref="content"
      :aria-hidden="isOpen ? 'false' : 'true'"
      :style="{ visibility: isOpen ? 'visible' : 'hidden' }"
      :class="contentCssClass"
      class="dropdown-content"
      @click="handleContentClick"
    >
      <div x-arrow />
      <slot name="dropdown-content" />
    </div>
  </div>
</template>

<script>
import Popper from 'popper.js'

export default {
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    triggerCssClass: {
      type: String,
      default: ''
    },
    contentCssClass: {
      type: String,
      default: ''
    },
    closeWhenClicked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    const clickOutsideContentHandler = event => {
      if (event.target === this.$el || this.$el.contains(event.target)) {
        return
      }
      this.isOpen = false
    }
    document.addEventListener('click', clickOutsideContentHandler)
    this.$once('hook:beforeDestroyed', () => {
      document.removeEventListener('click', clickOutsideContentHandler)
    })
  },
  beforeDestroyed() {
    this.popper.destroy()
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$nextTick(() => {
          this.setupPopper()
          this.$emit('open')
        })
      }
    },
    setupPopper() {
      if (this.isOpen) {
        if (this.popper === undefined) {
          this.popper = new Popper(this.$refs.trigger, this.$refs.content, {
            placement: this.placement
          })
        } else {
          this.popper.scheduleUpdate()
        }
      }
    },
    handleContentClick() {
      if (this.closeWhenClicked) {
        this.$nextTick(() => {
          this.isOpen = false
        })
      }
    }
  }
}
</script>

<style scoped>
[x-arrow] {
  position: absolute;
}
.dropdown-content {
  margin-top: 5px;
  margin-bottom: 5px;
}
.dropdown-content[x-placement^='top'] {
  border: 1px solid green;
}
.dropdown-content[x-placement^='bottom'] [x-arrow] {
  top: -5px;
  border-bottom: 5px solid #474747;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}
</style>
