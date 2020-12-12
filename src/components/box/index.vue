<template>
  <modal-wrapper>
    <modal-header
      :title="$t('box.title')"
      @close="$emit('close')"
      class="box-list-header">
      <template v-if="compute.mode !== 'list'" v-slot:navRight>
        <buttons-icon icon="menu" class="header-button" @click="gotoList"/>
      </template>
    </modal-header>
    <box-list
      v-if="compute.mode === 'list'"
      :loading="state.loading"
      :items="state.items"
      @click-add="state.mode = 'add'"
      @click-item="$emit('select-item', $event)"
      @click-edit="onClickEditItem"
      @click-remove="onClickRemoveItem"/>
    <manage
      v-else-if="compute.mode === 'manage'"
      :type="state.mode"
      :selected-item="state.selectedItem"
      @submit=""
      @cancel="gotoList"/>
    <teleport to="body">
      <confirm-dialog
        v-if="state.showRemoveDialog"
        :nested="true"/>
    </teleport>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { modelGetItems } from '@/libs/model';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import ConfirmDialog from '@/components/etc/confirm-dialog';
import ButtonsIcon from '@/components/buttons/icon';
import Manage from '@/components/box/manage';
import BoxList from '@/components/box/list';

export default defineComponent({
  name: 'box',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'confirm-dialog': ConfirmDialog,
    'buttons-icon': ButtonsIcon,
    'box-list': BoxList,
    'manage': Manage,
  },
  setup()
  {
    let state = reactive({
      mode: 'list', // list,add,edit
      loading: true,
      items: [],
      selectedItem: null,
      showRemoveDialog: false,
    });
    let compute = reactive({
      mode: computed(() => {
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
    const onClickEditItem = item => {
      state.selectedItem = item;
      state.mode = 'edit';
    };
    const onClickRemoveItem = item => {
      state.selectedItem = item;
      state.showRemoveDialog = true;
      // TODO: 작업 필요한 부분
      console.log('remove: ', item);
    };
    const gotoList = () => {
      state.selectedItem = null;
      state.mode = 'list';
    };

    // lifecycles
    onMounted(async () => {
      // get box items
      let items = await modelGetItems('box');
      state.items = (items && items.length > 0) ? items : [];
      state.loading = false;
    });

    return {
      state,
      compute,
      onClickEditItem,
      onClickRemoveItem,
      gotoList,
    };
  },
  emits: {
    'select-item': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
