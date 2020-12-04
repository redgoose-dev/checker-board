<template>
  <modal-wrapper>
    <modal-header
      :title="$t('preference.title')"
      class="preference-header"
      @close="$emit('close')"/>
    <form class="preference" @submit.prevent="save">
      <fieldset>
        <legend>preference form</legend>
        <div class="field">
          <p class="field__label">
            <label for="language">
              {{$t('preference.language')}}
            </label>
          </p>
          <p class="field__body">
            <forms-select
              name="language"
              id="language"
              v-model="state.forms.language"
              @update:model-value="save">
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </forms-select>
          </p>
        </div>
        <div class="field">
          <p class="field__label">
            <label for="dateFormat">
              {{$t('preference.dateFormat')}}
            </label>
          </p>
          <p class="field__body">
            <forms-select
              name="dateFormat"
              id="dateFormat"
              v-model="state.forms.dateFormat"
              @update:model-value="save">
              <option value="0">2020-12-25</option>
              <option value="1">2020/12/25</option>
              <option value="2">12-25-2020</option>
              <option value="3">12/25/2020</option>
              <option value="4">2020년 12월 25일</option>
            </forms-select>
          </p>
        </div>
      </fieldset>
    </form>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import FormsSelect from '@/components/forms/select';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'preference',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'forms-select': FormsSelect,
  },
  setup()
  {
    const store = useStore();
    const { locale } = useI18n({ useScope: 'global' });

    // state
    let state = reactive({
      forms: {
        language: store.state.preference.language,
        dateFormat: store.state.preference.dateFormat,
      },
    });

    // methods
    const save = async (e) => {
      await store.dispatch('updatePreference', state.forms);
      // change language
      if (locale.value !== state.forms.language)
      {
        locale.value = state.forms.language;
      }
    };

    return {
      state,
      save,
    };
  },
  emits: {
    close: null,
  },
});

// TODO: 언어설정 / `$i18n.locale='ko'`
// TODO: 날짜표기방식 목록 만들기 (@/libs/const.ts 에서 값 가져오기)
</script>

<style src="./index.scss" lang="scss" scoped></style>
