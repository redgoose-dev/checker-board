<template>
  <form class="box-manage" @submit.prevent="onSubmit">
    <h2 class="box-manage__title">
      {{$t(`base.${type}`)}}
    </h2>
    <fieldset class="box-manage__fieldset">
      <legend>manage box form</legend>
      <div class="field">
        <p class="field__label">
          <label for="name">{{$t('box.manage.name')}}</label>
        </p>
        <p class="field__body">
          <forms-input
            type="text"
            name="name"
            id="name"
            :placeholder="$t('box.placeholder.name')"
            :required="true"
            v-model="state.forms.name"/>
        </p>
      </div>
      <div class="field">
        <p class="field__label">
          <label for="description">{{$t('box.manage.description')}}</label>
        </p>
        <p class="field__body">
          <forms-input
            type="text"
            name="description"
            id="description"
            :placeholder="$t('box.placeholder.description')"
            :required="true"
            v-model="state.forms.description"/>
        </p>
      </div>
      <div class="field">
        <p class="field__label">
          <label for="reset">{{$t('box.manage.resetTime')}}</label>
        </p>
        <p class="field__body">
          <forms-input
            type="time"
            name="reset"
            id="reset"
            :required="true"
            v-model="state.forms.reset"/>
        </p>
      </div>
    </fieldset>
    <nav class="box-manage__nav">
      <buttons-basic type="button" skin="dark" @click="$emit('cancel')">
        {{$t(`base.cancel`)}}
      </buttons-basic>
      <buttons-basic type="submit">
        {{$t(`box.${compute.submitLabel}`)}}
      </buttons-basic>
    </nav>
  </form>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { addItem, editItem } from '@/libs/model';
import { convertPureObject } from '@/libs/util';
import ButtonsBasic from '@/components/buttons/basic';
import FormsInput from '@/components/forms/input';
export default defineComponent({
  name: 'box-manage',
  components: {
    'buttons-basic': ButtonsBasic,
    'forms-input': FormsInput,
  },
  props: {
    type: { type: String, default: 'add' }, // add,edit
    selectedItem: Object,
  },
  setup(props, context)
  {
    const { t } = useI18n({ useScope: 'global' });
    let state = reactive({
      forms: props.selectedItem ? {
        name: props.selectedItem?.name,
        description: props.selectedItem?.description,
        reset: props.selectedItem?.reset,
      } : {
        name: '',
        description: '',
        reset: '05:00',
      },
    });
    let compute = reactive({
      submitLabel: computed(() => {
        switch (props.type)
        {
          case 'edit':
            return 'submitEdit';
          case 'add':
          default:
            return 'submitAdd';
        }
      }),
    });

    const onSubmit = async () => {
      try
      {
        switch (props.type)
        {
          case 'add':
            await addItem('box', convertPureObject(state.forms));
            context.emit('submit', null);
            break;
          case 'edit':
            if (!props.selectedItem.srl) throw new Error(t('error.unknown.description'));
            await editItem('box', props.selectedItem.srl, true, convertPureObject(state.forms));
            context.emit('submit', props.selectedItem.srl);
            break;
          default:
            throw new Error(t('error.unknown.description'));
        }
      }
      catch(e)
      {
        alert(e.message);
        context.emit('cancel');
      }
    };

    return {
      state,
      compute,
      onSubmit,
    };
  },
  emits: {
    'cancel': null,
    'submit': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
