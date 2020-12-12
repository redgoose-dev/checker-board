<template>
  <form class="box-manage" @submit.prevent="onSubmit">
    <h2 class="box-manage__title">
      {{$t(`base.${type}`)}}
    </h2>
    <fieldset class="box-manage__fieldset">
      <legend>manage box form</legend>
      <div class="field">
        <p class="field__label">
          <label for="name">이름</label>
        </p>
        <p class="field__body">
          <forms-input
            type="text"
            name="name"
            id="name"
            :placeholder="$t('box.placeholder.name')"
            v-model="state.forms.name"/>
        </p>
      </div>
      <div class="field">
        <p class="field__label">
          <label for="description">설명</label>
        </p>
        <p class="field__body">
          <forms-input
            type="text"
            name="description"
            id="description"
            :placeholder="$t('box.placeholder.description')"
            v-model="state.forms.description"/>
        </p>
      </div>
      <div class="field">
        <p class="field__label">
          <label for="reset">리셋시간</label>
        </p>
        <p class="field__body">
          <forms-input
            type="time"
            name="reset"
            id="reset"
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
  setup(props)
  {
    let state = reactive({
      forms: props.selectedItem ? {
        name: props.selectedItem.name,
        description: props.selectedItem.description,
        reset: props.selectedItem.reset,
      } : {
        name: '',
        description: '',
        reset: '',
      },
    });
    console.log(props.selectedItem);
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

    const onSubmit = e => {
      console.log('call onsubmit', e);
    };

    return {
      state,
      compute,
      onSubmit,
    };
  },
  emits: {
    'cancel': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
