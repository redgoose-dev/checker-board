<template>
  <header class="modal-header">
    <nav v-if="$slots.navLeft" class="modal-header__nav">
      <slot name="navLeft"/>
    </nav>
    <h1 class="modal-header__title">
      {{title}}
    </h1>
    <nav class="modal-header__nav">
      <slot name="navRight"/>
      <buttons-icon icon="x" @click="$emit('close')"/>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonsIcon from '@/components/buttons/icon';

export default defineComponent({
  name: 'modal-header',
  components: {
    'buttons-icon': ButtonsIcon,
  },
  props: {
    title: { type: String, required: true },
  },
  emits: {
    close: null,
  },
});
</script>

<style src="./modal-header.scss" lang="scss" scoped></style>
