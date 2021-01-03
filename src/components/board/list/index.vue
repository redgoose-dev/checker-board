<template>
  <modal-wrapper class="board-list" @close="$emit('close')">
    <modal-header :title="computes.boxName" @close="$emit('close')"/>
    <div v-if="state.loading" class="board-list__loading">
      <loading/>
    </div>
    <template v-else>
      <div class="board-list__control">
        <fieldset class="board-list__filter">
          <legend>filter</legend>
          <label>
            <span>{{$t('board.year')}}:</span>
            <forms-select
              name="filter_year"
              v-model="state.selectedFilter.year">
              <option v-for="n in filters.years" :value="n" :key="n">
                {{n}}
              </option>
            </forms-select>
          </label>
          <label>
            <span>{{$t('board.month')}}:</span>
            <forms-select
              name="filter_month"
              v-model="state.selectedFilter.month">
              <option
                v-for="n in filters.months"
                :value="n"
                :key="n">
                {{n}}
              </option>
            </forms-select>
          </label>
        </fieldset>
      </div>
      <article v-if="state.index?.length > 0" class="board-list__body">
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
      <div v-else class="board-list__empty">
        <empty/>
      </div>
    </template>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { rangeNumbers } from '@/libs/number';
import { setTime } from '@/libs/dates';
import { getItem, getItems } from '@/libs/model';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import FormsSelect from '@/components/forms/select';
import ButtonsIcon from '@/components/buttons/icon';
import Item from './item';
import Loading from '@/components/etc/loading';
import Empty from '@/components/etc/empty';

export default defineComponent({
  name: 'board-list',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'forms-select': FormsSelect,
    'buttons-icon': ButtonsIcon,
    'item': Item,
    'loading': Loading,
    'empty': Empty,
  },
  setup(props, context)
  {
    const store = useStore();
    const { preference } = store.state;
    const today = new Date();

    // state
    let state = reactive({
      loading: true,
      box: null,
      selectedFilter: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
      },
      index: [],
    });
    let computes = reactive({
      boxName: computed(() => state.box?.name),
    });
    let filters = reactive({
      rangeYear: preference.dateRange,
      years: computed(() => {
        let range = rangeNumbers(Number(preference.dateRange[0]), Number(preference.dateRange[1]));
        const currentYear = new Date().getFullYear();
        if (range.indexOf(currentYear) < 0) range.push(currentYear);
        return range;
      }),
      months: rangeNumbers(1, 12),
    });

    // methods
    const onSelectItem = async srl => {
      if (!srl) return;
      await store.dispatch('updatePreference', { board: srl });
      context.emit('select-item');
    };
    const fetchBox = async () => {
      return await getItem('box', preference.box);
    };
    const fetchBoardItems = async () => {
      let start = setTime(state.selectedFilter.year, state.selectedFilter.month - 1, 1, [ 0, 0, 0, 0 ]);
      let end = setTime(state.selectedFilter.year, state.selectedFilter.month, 0, [ 0, 0, 0, 0 ]);
      let items = await getItems({
        store: 'board',
        where: {
          key: 'box',
          value: state.box?.srl,
        },
        range: {
          key: 'date',
          value: [ start, end ],
        },
        order: 'date',
        sort: 'desc',
      });
      if (!(items && items.length > 0)) return [];
      return items;
    };
    const updateFilter = async () => {
      state.index = await fetchBoardItems();
    };
    const setSelectedDate = async () => {
      let item = await getItem('board', preference.board);
      return {
        year: item.date.getFullYear(),
        month: item.date.getMonth() + 1,
      };
    };

    // lifecycles
    onMounted(async () => {
      try
      {
        state.box = await fetchBox();
        state.index = await fetchBoardItems();
        state.selectedFilter = await setSelectedDate();
        state.loading = false;
      }
      catch (e)
      {
        state.index = [];
        state.loading = false;
      }
    });

    // watch
    watch(() => state.selectedFilter.year, updateFilter);
    watch(() => state.selectedFilter.month, updateFilter);

    return {
      state,
      computes,
      filters,
      preference,
      onSelectItem,
    };
  },
  emits: {
    'select-item': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
