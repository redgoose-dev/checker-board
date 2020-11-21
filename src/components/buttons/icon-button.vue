<template>
<button
  type="button"
  :title="title"
  class="icon-button">
  <Icons :icon-name="icon" class="icon-button__icon"/>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from '@/components/icons/index.vue';

export default defineComponent({
  name: 'icon-button',
  components: {
    Icons,
  },
  props: {
    title: { type: String, default: 'button' },
    icon: { type: String, required: true },
  },
});
</script>

<style src="./icon-button.scss" lang="scss" scoped></style>
