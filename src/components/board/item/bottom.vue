<template>
<div class="board-item-bottom">
  <button
    class="board-item-bottom__edit"
    @click="$emit('click-edit')">
    <Icons icon="edit"/>
  </button>
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
import Icons from '@/components/icons/index.vue';

export default defineComponent({
  name: 'board-item-bottom',
  components: {
    Icons,
  },
  setup()
  {
    // state
    let state = reactive({
      percent: computed(() => {
        return 69;
      })
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
