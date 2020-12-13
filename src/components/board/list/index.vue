<template>
  <modal-wrapper class="board-list">
    <modal-header
      :title="state.boxName"
      class="board-list__header"
      @close="$emit('close')">
      <template v-slot:navRight>
        <buttons-icon
          icon="grid"
          class="header-button"
          @click="$emit('goto-box')"/>
      </template>
    </modal-header>
    <loading v-if="state.loading"/>
    <template v-else>
      <div class="board-list__control">
        <fieldset class="board-list__filter">
          <legend>filter</legend>
          <label>
            <span>년도:</span>
            <forms-select
              name="filter_year"
              v-model="state.selectedFilter.year">
              <option v-for="n in state.filters.years" :value="n" :key="n">
                {{n}}
              </option>
            </forms-select>
          </label>
          <label>
            <span>월:</span>
            <forms-select
              name="filter_month"
              v-model="state.selectedFilter.month">
              <option
                v-for="n in state.filters.months"
                :value="n"
                :key="n">
                {{n}}
              </option>
            </forms-select>
          </label>
        </fieldset>
      </div>
      <article class="board-list__body">
        <h2 class="board-list__title">Board list</h2>
        <ul class="board-list__index">
          <li v-for="(o,k) in state.index" :key="k">
            <item
              :date="o.date"
              :active="preference.board === o.srl"
              :date-type="preference.dateFormat"
              @select-item="onSelectItem(o?.srl)"/>
          </li>
        </ul>
      </article>
    </template>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { rangeNumbers } from '@/libs/number';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import FormsSelect from '@/components/forms/select';
import ButtonsIcon from '@/components/buttons/icon';
import Item from './item';
import Loading from '@/components/etc/loading';
import { modelGetItem, modelGetItems } from '@/libs/model';
import * as util from '@/libs/util';
export default defineComponent({
  name: 'board-list',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'forms-select': FormsSelect,
    'buttons-icon': ButtonsIcon,
    'item': Item,
    'loading': Loading,
  },
  async setup(props, context)
  {
    // TODO: 전체 보드 목록에서 시작 날짜와 오늘날짜를 구해서 필터의 날짜를 만들어야 한다.
    const store = useStore();
    const { preference } = store.state;

    // state
    let state = reactive({
      loading: true,
      boxName: '',
      // TODO: 필터 날짜출력 부분부터 작업하기
      selectedFilter: {
        year: 2000,
        month: 1,
      },
      index: [],
      filters: {
        years: computed(() => rangeNumbers(2000, 2010)),
        months: computed(() => rangeNumbers(1, 12)),
      },
    });

    // methods
    const onSelectItem = async srl => {
      if (!srl) return;
      await store.dispatch('updatePreference', { board: srl });
      context.emit('select-item');
    };
    const onClickEditBox = () => {
      console.log('on click edit box in board-list');
    };
    const onClickRemoveBox = () => {
      console.log('on click remove box in board-list');
    };

    // lifecycles
    onMounted(async () => {
      try
      {
        let box = await modelGetItem('box', preference.box);
        if (!box) return;
        state.boxName = box.name;
        let boards = await modelGetItems('board', 'box', box.srl);
        if (!(boards && boards.length > 0)) state.index = [];
        state.index = boards.reverse();
        state.loading = false;
      }
      catch (e)
      {
        state.index = [];
        state.loading = false;
      }
    });

    return {
      state,
      preference,
      onSelectItem,
      onClickEditBox,
      onClickRemoveBox,
    };
  },
  emits: {
    'select-item': null,
    'goto-box': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
