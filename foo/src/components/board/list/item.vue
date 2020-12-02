<template>
  <a
    href="#"
    :class="[
      'board-list-item',
      state.today && 'board-list-item--today',
    ]"
    @click.prevent="$emit('select-item')">
    <p class="label">
      {{state.label}}
    </p>
    <icons
      v-if="state.today"
      icon-name="check"
      class="icon"/>
  </a>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from 'vue';
import { convertFormat, checkToday } from '@/libs/dates';
import Icons from '@/components/icons/index.vue';
export default defineComponent({
  name: 'board-list-item',
  components: {
    Icons,
  },
  props: {
    date: {
      type: Date as PropType<Date>,
      required: true,
    },
  },
  setup(props)
  {
    return {
      state: reactive({
        label: computed(() => convertFormat(props.date, 3)),
        today: computed(() => checkToday(props.date)),
      }),
    };
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
