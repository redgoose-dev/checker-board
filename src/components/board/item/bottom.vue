<template>
<div class="board-item-bottom">
  <buttons-icon
    icon="edit"
    :disabled="!today"
    class="board-item-bottom__edit"
    @click="$emit('click-edit')"/>
  <p class="board-item-bottom__graph">
    <i :style="`--width: ${state.percent}%`"></i>
  </p>
  <p class="board-item-bottom__percent">
    {{state.percent}}%
  </p>
</div>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import ButtonsIcon from '@/components/buttons/icon';
export default defineComponent({
  name: 'board-item-bottom',
  components: {
    'buttons-icon': ButtonsIcon,
  },
  props: {
    today: Boolean,
  },
  setup()
  {
    // state
    let state = reactive({
      percent: computed(() => {
        return 69;
      }),
    });
    return {
      state,
    };
  },
  emits: {
    'click-edit': null,
  },
});
</script>

<style src="./bottom.scss" lang="scss" scoped></style>
