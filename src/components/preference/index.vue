<template>
  <modal-wrapper @close="$emit('close')">
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
            <label for="theme">
              {{$t('preference.theme')}}
            </label>
          </p>
          <p class="field__body">
            <forms-select
              name="theme"
              id="theme"
              v-model="state.forms.theme"
              @update:model-value="save">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
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
              <option value="2">12. 25. 2020</option>
              <option value="3">
                2020{{$t('preference.year')}} 12{{$t('preference.month')}} 25{{$t('preference.day')}}
              </option>
              <option value="4">25 December, 2020</option>
            </forms-select>
          </p>
        </div>
        <section class="section">
          <p class="section__title">{{$t('preference.reset.title')}}</p>
          <p class="section__description">{{$t('preference.reset.description')}}</p>
          <nav class="section__body">
            <buttons-basic type="button" @click="onClickResetData">
              {{$t('preference.reset.title')}}
            </buttons-basic>
          </nav>
        </section>
        <section class="section">
          <p class="section__title">{{$t('preference.backup.title')}}</p>
          <p class="section__description">{{$t('preference.backup.description')}}</p>
          <nav class="section__body">
            <buttons-basic type="button" @click="onClickBackupData">
              {{$t('preference.backup.buttonLabel')}}
            </buttons-basic>
          </nav>
        </section>
        <section class="section">
          <p class="section__title">{{$t('preference.restore.title')}}</p>
          <p class="section__description">{{$t('preference.restore.description')}}</p>
          <nav class="section__body">
            <buttons-basic type="button" @click="onClickRestoreData">
              {{$t('preference.restore.buttonLabel')}}
            </buttons-basic>
          </nav>
        </section>
      </fieldset>
    </form>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { removeDatabase, backupData, restoreData } from '@/libs/model';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import FormsSelect from '@/components/forms/select';
import ButtonsBasic from '@/components/buttons/basic';
export default defineComponent({
  name: 'preference',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'forms-select': FormsSelect,
    'buttons-basic': ButtonsBasic,
  },
  setup()
  {
    const store = useStore();
    const { locale, t } = useI18n({ useScope: 'global' });

    // state
    let state = reactive({
      forms: {
        language: store.state.preference.language,
        dateFormat: store.state.preference.dateFormat,
        theme: store.state.preference.theme,
      },
    });

    // methods
    const save = async () => {
      await store.dispatch('updatePreference', state.forms);
      // change language
      if (locale.value !== state.forms.language)
      {
        locale.value = state.forms.language;
      }
    };
    const onClickResetData = async () => {
      if (!confirm(t('preference.reset.confirm'))) return;
      await removeDatabase();
      location.reload();
    };
    const onClickBackupData = async () => {
      if (!confirm(t('preference.backup.confirm'))) return;
      await backupData();
    };
    const onClickRestoreData = async () => {
      if (!confirm(t('preference.restore.confirm'))) return;
      console.log('call onClickRestoreData()')
      // TODO: 작업해야하는 부분
    };

    return {
      state,
      save,
      onClickResetData,
      onClickBackupData,
      onClickRestoreData,
    };
  },
  emits: {
    close: null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
