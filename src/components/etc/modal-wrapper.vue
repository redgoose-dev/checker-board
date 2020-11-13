<template>
<div class="modal-wrapper">
  <div class="modal-wrapper__body">
    <slot/>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'ModalWrapper',
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
    return {};
  },
});
</script>

<style src="./modal-wrapper.scss" lang="scss" scoped></style>
