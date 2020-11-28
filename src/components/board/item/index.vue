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
      <board-manage
        v-if="state.showBoardManage"
        @close="state.showBoardManage = false"/>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import BoardItemTop from './top.vue';
import BoardItemBottom from './bottom.vue';
import BoardManage from '@/components/board/manage/index.vue';

export default defineComponent({
  name: 'board-item',
  components: {
    BoardItemTop,
    BoardItemBottom,
    BoardManage,
  },
  setup()
  {
    return {
      state: reactive({
        showBoardManage: false,
      }),
    };
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
