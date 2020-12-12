<template>
  <button
    :type="type"
    :title="title"
    :class="[
      `button-basic`,
      skin && `button-basic--skin-${skin}`,
    ]">
    <slot/>
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'button-basic',
  props: {
    title: { type: String, default: 'button' },
    type: { type: String, default: 'button' },
    skin: String,
  },
});
</script>

<style src="./basic.scss" lang="scss" scoped></style>
