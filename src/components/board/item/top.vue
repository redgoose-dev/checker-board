<template>
  <article class="board-item-top">
    <h2 class="board-item-top__date">{{state.date}}</h2>
    <button
      v-if="true"
      type="button"
      class="board-item-top__today"
      @click="$emit('click-today')">
      {{$t('board.today')}}
    </button>
  </article>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { convertFormat } from '@/libs/dates';
import { printf } from '@/libs/string';

export default defineComponent({
  name: 'board-item-top',
  components: {},
  setup()
  {
    const store = useStore();
    const { locale, t } = useI18n({ useScope: 'global' });
    let state = reactive({
      date: computed(() => {
        let formatType = parseInt(store.state.preference.dateFormat);
        let date = convertFormat(new Date(), formatType);
        switch (formatType)
        {
          case 2:
            date = printf(date, t('preference.year'), t('preference.month'), t('preference.date'));
            break;
        }
        return date;
      }),
    });

    return { state };
  },
  emits: {
    'click-today': null,
  },
});
</script>

<style src="./top.scss" lang="scss" scoped></style>
