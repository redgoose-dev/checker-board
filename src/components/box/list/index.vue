<template>
  <modal-wrapper>
    <modal-header
      :title="$t('box.listTitle')"
      @close="$emit('close')"
      class="box-list-header"/>
    <article v-if="state.computedMode === 'list'" class="box-list">
      <h2 class="box-list__title">Box list</h2>
      <ul v-if="!state.loading" class="box-list__index">
        <li>
          <add-item @click="state.mode = 'add'"/>
        </li>
        <li v-for="(o,k) in state.items" :key="k">
          <item
            :title="o.name"
            :description="o.description"
            @click-item="$emit('select-item', o.srl)"
            @click-edit="onClickEditItem(o.srl)"
            @click-remove="onClickRemoveItem(o.srl)"/>
        </li>
      </ul>
      <loading v-else/>
    </article>
    <template v-else-if="state.computedMode === 'manage'">
      <p>box-edit</p>
    </template>
    <teleport to="body">
      <confirm-dialog v-if="state.showRemoveDialog" :nested="true"/>
    </teleport>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { modelGetItems } from '@/libs/model';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import Loading from '@/components/etc/loading';
import ConfirmDialog from '@/components/etc/confirm-dialog';
import AddItem from './add-item';
import Item from './item';

export default defineComponent({
  name: 'box-list',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'loading': Loading,
    'confirm-dialog': ConfirmDialog,
    'add-item': AddItem,
    'item': Item,
  },
  setup()
  {
    const store = useStore();
    let state = reactive({
      mode: 'list', // list,add,edit
      loading: true,
      items: [],
      showRemoveDialog: false,
      computedMode: computed(() => {
        switch (state.mode)
        {
          case 'add':
          case 'edit':
            return 'manage';
          case 'list':
          default:
            return 'list';
        }
      }),
    });

    // methods
    const onClickEditItem = (id) => {
      state.mode = 'edit';
      console.log('edit: ', id);
    };
    const onClickRemoveItem = (id) => {
      state.showRemoveDialog = true;
      console.log('remove: ', id);
    };

    // TODO: 이 페이지부터 작업시작. 박스 추가부터 작업 시작하기

    // lifecycles
    onMounted(async () => {
      let items = await modelGetItems('box');
      state.items = (items && items.length > 0) ? items : [];
      state.loading = false;
    });

    return {
      state,
      onClickEditItem,
      onClickRemoveItem,
    };
  },
  emits: {
    'select-item': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
