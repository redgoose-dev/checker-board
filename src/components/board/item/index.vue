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
import { countingCheckbox } from '@/libs/string';
import { getItem, editItem, getItems, makeTodayItem } from '@/libs/model';
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
  async setup()
  {
    const store = useStore();
    const { preference } = store.state;
    const contentBody = ref('contentBody');

    // lifecycles
    onMounted(async () => {
      await updateItemBody();
      window.on('keydown.board-item-manage', e => {
        if (!state.showBoardManage && e.ctrlKey && e.key === 'e')
        {
          state.showBoardManage = true;
        }
      });
    });

    // state
    let state = reactive({
      showBoardManage: false,
      item: preference.board ? await getItem('board', store.state.preference.board) : null,
      items: preference.box ? await getItems({
        store: 'board',
        where: {
          key: 'box',
          value: store.state.preference.box,
        },
        order: 'date',
        sort: 'desc',
      }) : null,
      disabledBody: false,
      bodyCheckCount: {},
    });
    let computes = reactive({
      date: computed(() => {
        return convertFormat(state.item?.date, store.state.preference.dateFormat);
      }),
      today: computed(() => {
        if (!(state.item?.srl && state.items?.length)) return false;
        return state.items[0]?.srl === state.item.srl;
      }),
    });

    // methods
    const update = async () => {
      state.showBoardManage = false;
      let [ items, item ] = await Promise.all([
        getItems({
          store: 'board',
          where: {
            key: 'box',
            value: store.state.preference.box,
          },
          order: 'date',
          sort: 'desc',
        }),
        getItem('board', store.state.preference.board),
      ]);
      if (items)
      {
        state.items = items;
      }
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
          state.item.body = str;
          state.bodyCheckCount = updateCheckboxCount(state.item.body);
          await editItem('board', state.item?.srl, true, {
            body: str,
            percent: state.bodyCheckCount.percent,
          });
          state.disabledBody = false;
        },
      });
    };
    const updateCheckboxCount = body => {
      const { total, checked, percent } = countingCheckbox(body);
      return { total, checked, percent };
    };

    // counting body checkbox
    state.bodyCheckCount = updateCheckboxCount(state.item?.body);

    // watch
    watch(() => store.state.preference.board, update);
    watch(() => state.item?.srl, updateItemBody);
    watch(() => state.item?.body, updateItemBody);
    watch(() => state.showBoardManage, value => {
      if (!value) nextTick().then(() => updateItemBody());
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
