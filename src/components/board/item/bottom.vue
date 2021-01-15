<template>
<div class="board-item-bottom">
  <buttons-icon
    icon="edit"
    :disabled="!today"
    class="board-item-bottom__edit"
    @click="$emit('click-edit')"/>
  <p class="board-item-bottom__graph">
    <i :style="`--width: ${countCheckbox.percent}%`"></i>
  </p>
  <p class="board-item-bottom__percent">
    {{countCheckbox.percent}}%
  </p>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonsIcon from '@/components/buttons/icon';

export default defineComponent({
  name: 'board-item-bottom',
  components: {
    'buttons-icon': ButtonsIcon,
  },
  props: {
    today: Boolean,
    countCheckbox: {
      total: { type: Number, default: 0 },
      checked: { type: Number, default: 0 },
      percent: { type: Number, default: 0 },
    },
  },
  emits: {
    'click-edit': null,
  },
});
</script>

<style src="./bottom.scss" lang="scss" scoped></style>
