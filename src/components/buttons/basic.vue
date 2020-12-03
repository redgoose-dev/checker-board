<template>
  <button
    :type="type"
    :title="title"
    class="button-basic">
    <slot/>
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'button-basic',
  props: {
    title: { type: String, required: true },
    type: { type: String, default: 'button' },
  },
});
</script>

<style src="./basic.scss" lang="scss" scoped></style>
