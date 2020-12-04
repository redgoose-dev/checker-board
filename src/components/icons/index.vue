<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :aria-labelledby="icon"
    role="presentation"
    class="icons">
    <title :id="icon" lang="en">{{ icon }} icon</title>
    <g fill="none" fill-rule="evenodd">
      <component :is="state.computedIconComponent" class="icons__unit"/>
    </g>
  </svg>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed, reactive } from 'vue';
export default defineComponent({
  name: 'icons',
  props: {
    size: { type: Number, default: 24 },
    icon: { type: String, required: true },
  },
  setup(props, context)
  {
    let state = reactive({
      computedIconComponent: computed(() => {
        switch(props.icon)
        {
          case 'grid':
            return defineAsyncComponent(() => import('./src/icon-grid'));
          case 'setting':
            return defineAsyncComponent(() => import('./src/icon-setting'));
          case 'edit':
            return defineAsyncComponent(() => import('./src/icon-edit'));
          case 'x':
            return defineAsyncComponent(() => import('./src/icon-x'));
          case 'down':
            return defineAsyncComponent(() => import('./src/icon-down'));
          case 'trash':
            return defineAsyncComponent(() => import('./src/icon-trash'));
          case 'plus':
            return defineAsyncComponent(() => import('./src/icon-plus'));
          case 'check':
            return defineAsyncComponent(() => import('./src/icon-check'));
          case 'menu':
            return defineAsyncComponent(() => import('./src/icon-menu'));
          default:
            return null;
        }
      }),
    });
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.icons {
  display: block;
  width: var(--icon-size, 24px);
  height: var(--icon-size, 24px);
  &__unit {
    stroke-width: var(--icon-stroke-width, 2px);
    color: var(--icon-color, #000);
  }
}
</style>
