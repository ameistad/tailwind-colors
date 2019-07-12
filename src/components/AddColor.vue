<template>
  <dropdown
    trigger-css-class="inline-flex items-center focus:outline-none"
    :close-when-clicked="true"
  >
    <template
      slot="dropdown-trigger"
    >
      <icon-base
        height="25"
        width="25"
      >
        <icon-add />
      </icon-base>
      <span class="text-xl font-semibold">
        Add Color
      </span>
    </template>
    <template slot="dropdown-content">
      <div  class="bg-white rounded shadow">
        <ul>
          <li
            v-for="color in standardColors"
            :key="color.name"
          >
            <button
              @click="$emit('add-color', { name: color.name, shades: [...color.shades] })"
              class="flex flex-col focus:outline-none hover:bg-gray-200 py-2 px-4 w-full"
            >
              <b class="text-sm font-semibold">
                {{ color ? color.name.charAt(0).toUpperCase() + color.name.slice(1) : '' }}
              </b>
              <ul class="flex">
                <li
                  v-for="shade in color.shades"
                  :key="shade.name"
                  :style="{ background: shade.hexCode }"
                  class="w-6 h-2 flex-1 shadow-inner"
                />
              </ul>
            </button>
          </li>
        </ul>
      </div>
    </template>
  </dropdown>
</template>

<script>
import standardColors from '@/data/standardColors'
import Dropdown from '@/components/Dropdown'
import IconBase from '@/components/icons/IconBase'
import IconAdd from '@/components/icons/IconAdd'

export default {
  components: {
    Dropdown,
    IconBase,
    IconAdd
  },
  data () {
    return {
      standardColors
    }
  }
}
</script>
