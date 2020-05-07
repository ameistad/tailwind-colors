<template>
  <svg
    :class="{ 'cursor-pointer': cursorPointer }"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    role="presentation"
    @click="$emit('click')"
  >
    <title :id="iconName" lang="en">
      {{ iconName }}
    </title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 28
    },
    height: {
      type: [Number, String],
      default: 28
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    cursorPointer: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
.cursor-pointer {
  cursor: pointer;
}
</style>
