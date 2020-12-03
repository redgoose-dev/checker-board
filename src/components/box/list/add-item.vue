<template>
  <button
    type="button"
    title="Add item"
    class="add-item">
    <icons icon="plus" class="add-item__icon"/>
  </button>
</template>

<script>
import { defineComponent } from 'vue';
import Icons from '@/components/icons/index.vue';
export default defineComponent({
  name: 'box-list-add-item',
  components: {
    'icons': Icons,
  },
});
</script>

<style src="./add-item.scss" lang="scss" scoped></style>
