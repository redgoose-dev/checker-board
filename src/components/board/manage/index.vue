<template>
  <form ref="root" class="board-manage" @submit.prevent="onSubmit">
    <div class="board-manage__body">
      <textarea
        v-model.lazy="state.body"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Please input text"
        @keydown="onKeydownBody"/>
    </div>
    <nav class="board-manage__nav">
      <buttons-basic type="button" skin="dark" @click="$emit('close')">
        {{$t(`base.cancel`)}}
      </buttons-basic>
      <buttons-basic type="submit">
        {{$t(`base.edit`)}}
      </buttons-basic>
    </nav>
  </form>
</template>

<script>
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { getItem, editItem } from '@/libs/model';
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
    const onSubmit = async () => {
      await editItem('board', props.srl, true, {
        body: state.body,
      });
      context.emit('submit');
    }
    const onKeydownBody = e => {
      switch (e.key)
      {
        case 'Escape':
          context.emit('close');
          break;
        case 'Enter':
          if ((e.metaKey || e.ctrlKey))
          {
            e.target.blur();
            onSubmit().then();
          }
          break;
      }
    };
    const foo = e => {
      console.log('foo', e);
    };

    // lifecycles
    onMounted(async () => {
      let item = await getItem('board', props.srl);
      state.body = item?.body || '';
      // auto focus in body
      const $body = root.value?.querySelector('textarea');
      $body?.focus();
    });

    return {
      root,
      state,
      onSubmit,
      onKeydownBody,
      foo,
    };
  },
  emits: {
    'close': null,
    'submit': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
