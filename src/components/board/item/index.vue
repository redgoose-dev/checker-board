<template>
  <div class="board-item">
    <board-item-top
      :date="computes.date"
      :today="computes.today"
      class="board-item__top"
      @click-goto-today="onGotoToday"/>
    <template v-if="!state.showBoardManage">
      <div class="board-item__body">
        {{computes.body}}
      </div>
      <board-item-bottom
        :checkbox-total="20"
        :checkbox-checked="10"
        class="board-item__bottom"
        @click-edit="state.showBoardManage = true"/>
    </template>
    <board-manage
      v-else
      :srl="state.item.srl"
      class="board-item__manage"
      @close="state.showBoardManage = false"
      @submit="onSubmitManage"/>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, watch } from 'vue';
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
      item: preference.board ? await modelGetItem('board', store.state.preference.board) : null,
    });
    let computes = reactive({
      date: computed(() => {
        return convertFormat(state.item.date, Number(store.state.preference.dateFormat));
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
          today.getDate() === date.getDate()
        );
      }),
    });

    // methods
    const update = async () => {
      let item = await modelGetItem('board', store.state.preference.board);
      if (item) state.item = item;
    };
    const onGotoToday = e => {
      // TODO: 오늘 board 글로 이동
      console.log('call onGotoToday()');
    };
    const onSubmitManage = async () => {
      state.showBoardManage = false;
      await update();
    };

    // watch preference.board
    watch(() => store.state.preference.board, async (newValue, value) => {
      if (newValue === value) return;
      await update();
    });

    return {
      state,
      computes,
      onGotoToday,
      onSubmitManage,
    };
  },
  emits: {},
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
