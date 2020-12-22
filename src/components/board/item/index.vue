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
        :count-checkbox="state.bodyCheckCount"
        :today="computes.today"
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
import { modelGetItem, modelEditItem, makeTodayItem } from '@/libs/model';
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
  props: {
    reset: String,
  },
  async setup(props)
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
      bodyCheckCount: {},
    });
    let computes = reactive({
      date: computed(() => {
        return convertFormat(state.item?.date, Number(store.state.preference.dateFormat));
      }),
      today: computed(() => {
        if (!state.item?.date) return false;
        const reset = props.reset.split(':');
        const today = new Date();
        today.setHours(Number(reset[0]));
        today.setMinutes(Number(reset[1]));
        const { date } = state.item;
        // 비교대상 (데이터 날짜 > 오늘+리셋시간)
        return date.getTime() > today.getTime();
      }),
    });

    // methods
    const update = async () => {
      state.showBoardManage = false;
      let item = await modelGetItem('board', store.state.preference.board);
      if (item)
      {
        state.item = item;
        state.bodyCheckCount = updateCheckboxCount(state.item.body);
      }
    };
    const onGotoToday = async () => {
      let item = await makeTodayItem(state.item?.box);
      await store.dispatch('updatePreference', { board: item?.srl });
      state.item = item;
    };
    const onSubmitManage = async () => {
      state.showBoardManage = false;
      await update();
    };
    const updateItemBody = async () => {
      // 마크다운 본문에서 업데이트될때 호출되는 이벤트 함수
      const $body = contentBody.value;
      if (!$body) return;
      $body.innerHTML = '';
      await nextTick();
      updateBody({
        body: state.item?.body,
        $el: $body,
        today: computes.today,
        callback: async (str) => {
          state.disabledBody = true;
          await modelEditItem('board', state.item?.srl, true, { body: str });
          state.item.body = str;
          state.bodyCheckCount = updateCheckboxCount(state.item.body);
          state.disabledBody = false;
        },
      });
    };
    const updateCheckboxCount = body => (!body ? {
      total: 0,
      checked: 0,
    } : {
      total: (body.match(/\- \[x\]|\- \[ \]/g) || []).length,
      checked: (body.match(/\- \[x\]/g) || []).length,
    });

    // counting body checkbox
    state.bodyCheckCount = updateCheckboxCount(state.item?.body);

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
});
</script>

<style src="./index.scoped.scss" lang="scss" scoped></style>
<style src="./index.scss" lang="scss"></style>
