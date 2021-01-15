<template>
  <button
    type="button"
    :disabled="active"
    :class="[ 'item', computes.today && 'item--today' ]"
    @click.prevent="$emit('select-item')">
    <span class="item__wrap">
      <em class="label">{{computes.label}}</em>
      <em class="percent">{{percent}}%</em>
    </span>
  </button>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { convertFormat, checkToday } from '@/libs/dates';
import Icons from '@/components/icons';

export default defineComponent({
  name: 'board-list-item',
  components: {
    'icons': Icons,
  },
  props: {
    date: { type: Date, required: true },
    dateType: { type: [String, Number], default: 0 },
    percent: { type: Number, default: 0 },
    active: Boolean,
  },
  setup(props)
  {
    return {
      computes: reactive({
        label: computed(() => convertFormat(props.date, props.dateType)),
        today: computed(() => checkToday(props.date)),
      }),
    };
  },
  emits: {
    'select-item': null,
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
