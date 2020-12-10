<template>
  <modal-wrapper :nested="true">
    <p>dialog</p>
  </modal-wrapper>
</template>

<script>
import { defineComponent } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper';
export default defineComponent({
  name: 'confirm-dialog',
  components: {
    'modal-wrapper': ModalWrapper,
  },
  props: {
    nested: Boolean,
  },
});
</script>