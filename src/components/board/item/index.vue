<template>
  <div class="board-item">
    <board-item-top
      :date="computes.date"
      :today="computes.today"
      class="board-item__top"
      @click-goto-today="onGotoToday"/>
    <template v-if="!state.showBoardManage">
      <div :class="[ 'board-item__fieldset', state.disabledBody && `disabled` ]">
        <div ref="contentBody" class="board-item__body"/>
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
import { computed, defineComponent, reactive, watch, ref, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { convertFormat } from '@/libs/dates';
import { modelGetItem, modelEditItem } from '@/libs/model';
import { updateBody } from '@/libs/markdown';
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
    const contentBody = ref('contentBody');

    // lifecycles
    onMounted(() => updateItemBody().then());

    // state
    let state = reactive({
      showBoardManage: false,
      item: preference.board ? await modelGetItem('board', store.state.preference.board) : null,
      disabledBody: false,
    });
    let computes = reactive({
      date: computed(() => {
        return convertFormat(state.item?.date, Number(store.state.preference.dateFormat));
      }),
      today: computed(() => {
        if (!state.item?.date) return false;
        const today = new Date();
        const { date } = state.item;
        // TODO: 여기는 날짜뿐만 아니라 리셋시간이 지났는지 검사해봐야한다.
        return (
          today.getFullYear() === date.getFullYear() &&
          today.getMonth() === date.getMonth() &&
          today.getDate() === date.getDate()
        );
      }),
    });

    // methods
    const update = async () => {
      state.showBoardManage = false;
      let item = await modelGetItem('board', store.state.preference.board);
      if (item) state.item = item;
    };
    const onGotoToday = async () => {
      // TODO: 오늘 board 글로 이동
      console.log('call onGotoToday()');
    };
    const onSubmitManage = async () => {
      state.showBoardManage = false;
      await update();
    };
    const updateItemBody = async () => {
      const $body = contentBody.value;
      $body.innerHTML = '';
      await nextTick();
      updateBody(state.item?.body, $body, async (str) => {
        state.disabledBody = true;
        await modelEditItem('board', state.item?.srl, true, { body: str });
        state.item.body = str;
        state.disabledBody = false;
      });
    };

    // watch
    watch(() => store.state.preference.board, update);
    watch(() => state.item?.body, updateItemBody);
    watch(() => state.showBoardManage, async (value) => {
      if (value) return;
      await nextTick();
      await updateItemBody();
    });

    return {
      contentBody,
      state,
      computes,
      onGotoToday,
      onSubmitManage,
    };
  },
  emits: {
    'update': null,
  },
});
</script>

<style src="./index.scoped.scss" lang="scss" scoped></style>
<style src="./index.scss" lang="scss"></style>
