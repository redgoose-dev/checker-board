<template>
  <div ref="root" class="board-manage">
    <div class="board-manage__body">
      <textarea v-model="state.body" placeholder="Please input text"/>
    </div>
    <nav class="board-manage__nav">
      <buttons-basic type="button" skin="dark" @click="$emit('close')">
        {{$t(`base.cancel`)}}
      </buttons-basic>
      <buttons-basic type="button" @click="onSubmit">
        {{$t(`base.edit`)}}
      </buttons-basic>
    </nav>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { modelGetItem, modelEditItem } from '@/libs/model';
import ButtonsBasic from '@/components/buttons/basic';
export default defineComponent({
  name: 'board-manage',
  components: {
    'buttons-basic': ButtonsBasic,
  },
  props: {
    srl: Number,
  },
  setup(props, context)
  {
    const root = ref(null);

    // state
    let state = reactive({
      body: '',
    });

    // methods
    const onSubmit = async e => {
      await modelEditItem('board', props.srl, true, {
        body: state.body,
      });
      context.emit('submit');
    }

    // lifecycles
    onMounted(async () => {
      let item = await modelGetItem('board', props.srl);
      state.body = item?.body || '';
      // auto focus in body
      const $body = root.value?.querySelector('textarea');
      $body?.focus();
    });

    return {
      root,
      state,
      onSubmit,
    };
  },
  emits: {
    'close': null,
    'submit': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
