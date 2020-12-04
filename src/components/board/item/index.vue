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

<script>
import { defineComponent, reactive } from 'vue';
import Top from './top';
import Bottom from './bottom';
import BoardManage from '@/components/board/manage';

export default defineComponent({
  name: 'board-item',
  components: {
    'board-item-top': Top,
    'board-item-bottom': Bottom,
    'board-manage': BoardManage,
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
