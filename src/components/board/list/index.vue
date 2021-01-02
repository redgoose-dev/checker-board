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
import { defineComponent, reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { rangeNumbers } from '@/libs/number';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import FormsSelect from '@/components/forms/select';
import ButtonsIcon from '@/components/buttons/icon';
import Item from './item';
import Loading from '@/components/etc/loading';
import { getItem, getItems } from '@/libs/model';
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
      rangeYear: [ today.getFullYear(), today.getFullYear() ],
      rangeMonth: [ 1, 12 ],
      years: computed(() => rangeNumbers(Number(filters.rangeYear[0]), Number(filters.rangeYear[1]))),
      months: computed(() => rangeNumbers(Number(filters.rangeMonth[0]), Number(filters.rangeMonth[1]))),
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
      let items = await getItems({
        store: 'board',
        key: 'box',
        value: state.box?.srl,
        order: 'date',
        sort: 'desc',
      });
      if (!(items && items.length > 0)) return [];
      // items = items.reverse();
      return items;
    };
    const updateSelectedDateInFilter = () => {
      const dateRange = [ state.index[state.index.length - 1]?.date, state.index[0]?.date ];
      filters.rangeYear = [ dateRange[0]?.getFullYear(), dateRange[1]?.getFullYear() ];
      state.selectedFilter.year = filters.rangeYear[1];
      state.selectedFilter.month = dateRange[1].getMonth() + 1;
    }
    const updateFilter = async (value, oldValue) => {
      console.log('updateFilter()', state.selectedFilter);
      // TODO: 사용할 예정
      // state.index = await fetchBoardItems();
    };

    // lifecycles
    onMounted(async () => {
      try
      {
        // get box item
        state.box = await fetchBox();
        // get board items
        state.index = await fetchBoardItems();
        // set date range in filters
        if (state.index?.length > 0)
        {
          updateSelectedDateInFilter();
        }
        // off loading
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
