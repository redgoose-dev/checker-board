<template>
  <modal-wrapper>
    <modal-header
      :title="$t('preference.title')"
      @close="$emit('close')"
      class="preference-header"/>
    <form class="preference" @submit.prevent="save">
      <fieldset>
        <legend>preference form</legend>
        <p>
          <label for="language">{{$t('preference.language')}}</label>
          <input
            type="text"
            name="language"
            id="language"
            v-model="state.forms.language"/>
        </p>
        <p>
          <label for="dateFormat">{{$t('preference.dateFormat')}}</label>
          <input
            type="text"
            name="dateFormat"
            id="dateFormat"
            v-model="state.forms.dateFormat"/>
        </p>
      </fieldset>
      <p v-for="(o,k) in Array(30)" :key="k">===</p>
      <nav class="preference-bottom">
        <button-basic
          type="submit"
          :title="$t('preference.save')">
          {{$t('preference.save')}}
        </button-basic>
      </nav>
    </form>
  </modal-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import ModalWrapper from '@/components/etc/modal-wrapper.vue';
import ModalHeader from '@/components/etc/modal-header.vue';
import ButtonBasic from '@/components/buttons/basic.vue';

export default defineComponent({
  name: 'preference',
  components: {
    ModalWrapper,
    ModalHeader,
    ButtonBasic,
  },
  setup()
  {
    // set state
    let state = reactive({
      forms: {
        language: 'ko',
        dateFormat: 'default',
      },
    });

    // hooks
    onMounted(() => {
      console.log(state);
    });

    /**
     * submit
     *
     * @param {Event} e
     */
    const save = (e:Event):void => {
      console.log('submit:: ', e);
    };

    return {
      state,
      save,
    };
  },
});

// TODO: 언어설정 / `$i18n.locale='ko'`
</script>

<style src="./index.scss" lang="scss" scoped></style>
