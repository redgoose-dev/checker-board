<template>
  <article class="board-item">
    <BoardItemTop/>
    <div class="board-item__body">
      preview body
    </div>
    <BoardItemBottom @click-edit="state.showBoardEdit = true"/>
  </article>
  <teleport to="body">
    <transition name="modal-fade">
      <BoardEdit v-if="state.showBoardEdit"/>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import BoardItemTop from './top.vue';
import BoardItemBottom from './bottom.vue';
import BoardEdit from '@/components/Board/edit.vue';

export default defineComponent({
  name: 'Preview',
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
