<template>
  <article class="board-item">
    <board-item-top
      :date="computes.date"
      :today="computes.today"
      @click-goto-today="onGotoToday"/>
    <div class="board-item__body">
      {{computes.body}}
    </div>
    <board-item-bottom
      :checkbox-total="20"
      :checkbox-checked="10"
      @click-edit="state.showBoardManage = true"/>
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
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { convertFormat } from '@/libs/dates';
import { modelGetItem } from "@/libs/model";
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
  async setup()
  {
    const store = useStore();
    const { preference } = store.state;

    // state
    let state = reactive({
      showBoardManage: false,
      item: preference.board ? await modelGetItem('board', preference.board) : null,
    });
    let computes = reactive({
      date: computed(() => {
        return convertFormat(state.item.date, Number(preference.dateFormat));
      }),
      body: computed(() => {
        // TODO: markdown 파싱
        return state.item.body;
      }),
      today: computed(() => {
        if (!state.item.date) return false;
        const today = new Date();
        const { date } = state.item;
        return (
          today.getFullYear() === date.getFullYear() &&
          today.getMonth() === date.getMonth() &&
          today.getDay() === date.getDay()
        );
      }),
    });

    // methods
    const onGotoToday = e => {
      // TODO: 오늘 board 글로 이동
      console.log('call onGotoToday()');
    };

    return {
      state,
      computes,
      onGotoToday,
    };
  },
  emits: {},
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
