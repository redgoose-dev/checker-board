<template>
<div class="modal-wrapper">
  <div class="modal-wrapper__body">
    <slot/>
  </div>
</div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from 'vue';
export default defineComponent({
  name: 'modal-wrapper',
  props: {
    zIndex: Number,
    nested: Boolean,
  },
  setup(props)
  {
    // mounted
    onMounted(() => {
      if (!props.nested)
      {
        document.querySelector('html').classList.add('mode-modal');
      }
    });
    // unmounted
    onUnmounted(() => {
      if (!props.nested)
      {
        document.querySelector('html').classList.remove('mode-modal');
      }
    });
  },
});
</script>

<style src="./modal-wrapper.scss" lang="scss" scoped></style>
