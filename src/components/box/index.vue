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
      @submit="onSubmitManage"
      @cancel="gotoList"/>
  </modal-wrapper>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { modelGetItems, modelRemoveItem } from '@/libs/model';
import ModalWrapper from '@/components/etc/modal-wrapper';
import ModalHeader from '@/components/etc/modal-header';
import ButtonsIcon from '@/components/buttons/icon';
import Manage from '@/components/box/manage';
import BoxList from '@/components/box/list';
export default defineComponent({
  name: 'box',
  components: {
    'modal-wrapper': ModalWrapper,
    'modal-header': ModalHeader,
    'buttons-icon': ButtonsIcon,
    'box-list': BoxList,
    'manage': Manage,
  },
  setup()
  {
    const store = useStore();

    let state = reactive({
      mode: 'list', // list,add,edit
      loading: true,
      items: [],
      selectedItem: null,
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
    const onClickRemoveItem = async item => {
      if (item?.srl && confirm('foo'))
      {
        await modelRemoveItem('box', item.srl);
        state.loading = true;
        state.items = await fetchItems();
        state.loading = false;
      }
    };
    const gotoList = () => {
      state.selectedItem = null;
      state.mode = 'list';
    };
    const onSubmitManage = async () => {
      gotoList();
      state.loading = true;
      state.items = await fetchItems();
      state.loading = false;
    }
    const fetchItems = async () => {
      let items = await modelGetItems('box');
      return (items && items.length > 0) ? items.reverse().map(o => ({
        ...o,
        active: o.srl === store.state.preference.box,
      })) : [];
    };

    // lifecycles
    onMounted(async () => {
      state.items = await fetchItems();
      state.loading = false;
    });

    return {
      state,
      compute,
      onClickEditItem,
      onClickRemoveItem,
      gotoList,
      onSubmitManage,
    };
  },
  emits: {
    'select-item': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
