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
  },
  setup()
  {
    // mounted
    onMounted(() => {
      document?.querySelector('html')?.classList.add('mode-modal');
    });
    // unmounted
    onUnmounted(() => {
      document?.querySelector('html')?.classList.remove('mode-modal');
    });
  },
});
</script>

<style src="./modal-wrapper.scss" lang="scss" scoped></style>
