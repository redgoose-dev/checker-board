<template>
<div class="board-item-bottom">
  <button
    class="board-item-bottom__edit"
    @click="$emit('click-edit')">
    <Icons icon-name="edit"/>
  </button>
  <p class="board-item-bottom__graph">
    <i :style="`--width: ${computedPercent}%`"></i>
  </p>
  <p class="board-item-bottom__percent">
    {{computedPercent}}%
  </p>
</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Icons from '@/components/icons/index.vue';

export default defineComponent({
  name: 'board-item-bottom',
  components: {
    Icons,
  },
  setup()
  {
    return {
      computedPercent: computed(() => {
        return 69;
      }),
    };
  },
  methods: {
    //
  },
});
</script>

<style src="./bottom.scss" lang="scss" scoped></style>
