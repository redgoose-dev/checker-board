<template>
  <button
    type="button"
    :title="title"
    class="buttons-icon">
    <icons :icon="icon" class="buttons-icon__icon"/>
  </button>
</template>

<script>
import { defineComponent } from 'vue';
import icons from '@/components/icons';
export default defineComponent({
  name: 'buttons-icon',
  components: {
    icons,
  },
  props: {
    title: { type: String, default: 'button' },
    icon: { type: String, required: true },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
