<template>
<button
  type="button"
  :title="title"
  class="icon-button"
  @click="$emit('click')">
  <Icons :icon-name="icon" class="icon-button__icon"/>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from '@/components/Icons/Icons.vue';

export default defineComponent({
  name: 'IconButton',
  components: {
    Icons,
  },
  props: {
    title: { type: String, default: 'button' },
    icon: { type: String, required: true },
  },
});
</script>

<style src="./IconButton.scss" lang="scss" scoped></style>
