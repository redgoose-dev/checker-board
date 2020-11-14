<template>
  <article class="board-item">
    <board-item-top/>
    <div class="board-item__body">
      preview body
    </div>
    <board-item-bottom
      @click-edit="state.showBoardEdit = true"/>
  </article>
  <teleport to="body">
    <transition name="modal-fade">
      <board-edit
        v-if="state.showBoardEdit"/>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import BoardItemTop from './top.vue';
import BoardItemBottom from './bottom.vue';
import BoardEdit from '@/components/board/edit/index.vue';

export default defineComponent({
  name: 'board-item',
  components: {
    BoardItemTop,
    BoardItemBottom,
    BoardEdit,
  },
  setup()
  {
    return {
      state: reactive({
        showBoardEdit: false,
      }),
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
