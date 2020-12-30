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
          <p class="field__description">
            {{$t('preference.dateFormatDescription')}}<br/>
            {{$t('preference.dateFormatGuide', [`{yyyy}`, `{mm}`, `{dd}`, `{month}`, `{week}`, `{weekShort}`])}}
          </p>
          <p class="field__body">
            <forms-input
              name="dateFormat"
              id="dateFormat"
              v-model="state.forms.dateFormat"
              @blur:model-value="save"/>
          </p>
        </div>
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
        <section class="section">
          <p class="section__title">{{$t('preference.reset.title')}}</p>
          <p class="section__description">{{$t('preference.reset.description')}}</p>
          <nav class="section__body">
            <buttons-basic
              type="button"
              skin="red"
              @click="onClickResetData">
              {{$t('preference.reset.title')}}
            </buttons-basic>
          </nav>
        </section>
        <section class="section">
          <p class="section__title">{{$t('preference.information.title')}}</p>
          <ul class="section__description">
            <li>{{$t('preference.information.version')}}: {{$store.state.version}}</li>
            <li>
              <a href="https://github.com/redgoose-dev/checker-board" target="_blank">GitHub Project</a>
            </li>
          </ul>
        </section>
      </fieldset>
    </form>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { removeDatabase, getItems, clearStore, addItem } from '@/libs/model';
import { convertPureObject } from '@/libs/util';
import { twoDigit } from '@/libs/string';
import * as storage from '@/libs/storage';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import FormsSelect from '@/components/forms/select';
import FormsInput from '@/components/forms/input';
import ButtonsBasic from '@/components/buttons/basic';
export default defineComponent({
  name: 'preference',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'forms-select': FormsSelect,
    'forms-input': FormsInput,
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
      storage.remove('preference');
      location.reload();
    };
    const onClickBackupData = async () => {
      if (!confirm(t('preference.backup.confirm'))) return;
      const [ box, board ] = await Promise.all([
        getItems('box'),
        getItems('board'),
      ]);
      const preference = convertPureObject(store.state.preference);
      let result = { box, board, preference };
      let date = new Date();
      let dateFormat = `${date.getFullYear()}${twoDigit(date.getMonth() + 1)}${twoDigit(date.getDate())}`;
      const el = document.createElement('a');
      el.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result))}`);
      el.setAttribute('download', `checker-board_${dateFormat}.json`);
      el.click();
    };
    const onClickRestoreData = () => {
      return new Promise((resolve, reject) => {
        const el = document.createElement('input');
        el.setAttribute('type', 'file');
        el.setAttribute('accept', 'application/JSON');
        el.addEventListener('change', e => {
          if (!(e.target.files && e.target.files.length > 0))
          {
            alert(t('preference.restore.errorNoFile'));
            return;
          }
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = async e => {
            try
            {
              let json = JSON.parse(String(e.target.result));
              if (!confirm(t('preference.restore.confirm'))) return;
              if (!(json.preference && json.box && json.board)) throw new Error('no data');
              await Promise.all([
                clearStore('box'),
                clearStore('board'),
              ]);
              await store.dispatch('updatePreference', json.preference);
              await Promise.all(json.box.map(o => addItem('box', o)));
              await Promise.all(json.board.map(o => {
                return addItem('board', {
                  ...o,
                  date: new Date(o.date),
                });
              }));
              alert(t('preference.restore.complete'));
              location.reload();
            }
            catch(e)
            {
              reject(e.message);
            }
          };
          reader.readAsText(file);
        }, false);
        el.click();
      });
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
