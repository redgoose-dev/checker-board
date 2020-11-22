<template>
  <div class="board-list-item">
    <p class="board-list-item__label">
      {{state.label}}
    </p>
    <icons
      v-if="state.today"
      icon-name="check"
      class="board-list-item__check"/>
  </div>
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
        label: computed(() => {
          return convertFormat(props.date, 3);
        }),
        today: computed(() => {
          return false;
        }),
      }),
    };
  },
});
</script>

<style src="./item.scss" lang="scss" scoped></style>
