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
    <icon-button icon="x" @click="$emit('close')"/>
  </nav>
</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconButton from '@/components/buttons/icon-button.vue';

export default defineComponent({
  name: 'modal-header',
  components: {
    IconButton,
  },
  props: {
    title: { type: String, required: true },
  },
  setup()
  {
    return {};
  },
});
</script>

<style src="./modal-header.scss" lang="scss" scoped></style>
