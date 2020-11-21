<template>
<svg
  xmlns="http://www.w3.org/2000/svg"
  :width="size"
  :height="size"
  viewBox="0 0 24 24"
  :aria-labelledby="iconName"
  role="presentation"
  class="icons">
  <title :id="iconName" lang="en">{{ iconName }} icon</title>
  <g fill="none" fill-rule="evenodd">
    <component :is="iconComponent" class="icons__unit"/>
  </g>
</svg>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'icons',
  props: {
    size: { type: Number, default: 24 },
    iconName: { type: String, required: true },
  },
  computed: {
    iconComponent()
    {
      switch(this.iconName)
      {
        case 'grid':
          return defineAsyncComponent(() => import('./src/icon-grid.vue'));
        case 'setting':
          return defineAsyncComponent(() => import('./src/icon-setting.vue'));
        case 'edit':
          return defineAsyncComponent(() => import('./src/icon-edit.vue'));
        case 'x':
          return defineAsyncComponent(() => import('./src/icon-x.vue'));
        case 'down':
          return defineAsyncComponent(() => import('./src/icon-down.vue'));
        case 'trash':
          return defineAsyncComponent(() => import('./src/icon-trash.vue'));
        case 'plus':
          return defineAsyncComponent(() => import('./src/icon-plus.vue'));
        default:
          return null;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.icons {
  display: block;
  width: var(--size, 24px);
  height: var(--size, 24px);
  &__unit {
    stroke-width: var(--stroke-width, 2px);
    color: var(--color, #000);
  }
}
</style>
