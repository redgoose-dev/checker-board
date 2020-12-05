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
              <option value="en">English</option>
              <option value="ko">한국어</option>
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
              <option value="1">12-25-2020</option>
              <option v-if="state.visibleDateformat2" value="2">
                2020{{$t('preference.year')}} 12{{$t('preference.month')}} 25{{$t('preference.date')}}
              </option>
              <option value="3">25 December, 2020</option>
            </forms-select>
          </p>
        </div>
      </fieldset>
    </form>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
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
      visibleDateformat2: computed(() => {
        return (store.state.preference.language !== 'en');
      }),
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
</script>

<style src="./index.scss" lang="scss" scoped></style>
