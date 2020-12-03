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
              v-model="state.forms.language">
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
              v-model="state.forms.dateFormat">
              <option value="0">2020-12-25</option>
              <option value="1">2020/12/25</option>
              <option value="2">12-25-2020</option>
              <option value="3">12/25/2020</option>
              <option value="4">2020년 12월 25일</option>
            </forms-select>
          </p>
        </div>
      </fieldset>
      <nav class="preference-bottom">
        <buttons-basic
          type="submit"
          :title="$t('preference.save')">
          {{$t('preference.save')}}
        </buttons-basic>
      </nav>
    </form>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import ButtonsBasic from '@/components/buttons/basic';
import FormsSelect from '@/components/forms/select';

export default defineComponent({
  name: 'preference',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'buttons-basic': ButtonsBasic,
    'forms-select': FormsSelect,
  },
  setup()
  {
    // set state
    let state = reactive({
      forms: {
        language: 'ko',
        dateFormat: 0,
      },
    });

    // hooks
    onMounted(() => {
      //console.log(state);
    });

    // methods
    const save = (e) => {
      console.log('submit:: ', e);
    };

    // etc
    console.warn('call setup() in preference');

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
