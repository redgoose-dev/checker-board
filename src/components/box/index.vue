<template>
  <modal-wrapper class="box-root" @close="$emit('close')">
    <modal-header
      :title="$t('box.title')"
      @close="$emit('close')"
      class="box-list-header">
      <template v-slot:navRight>
        <buttons-icon
          v-if="compute.mode !== 'list'"
          icon="grid"
          class="header-button"
          @click="gotoList"/>
        <buttons-icon
          v-else
          icon="plus"
          class="header-button add"
          @click="state.mode = 'add'"/>
      </template>
    </modal-header>
    <box-list
      v-if="compute.mode === 'list'"
      :loading="state.loading"
      :items="state.items"
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
import { useI18n } from 'vue-i18n';
import { getItems, removeItems } from '@/libs/model';
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
  setup(props, context)
  {
    const { emit } = context;
    const store = useStore();
    const { t } = useI18n({ useScope: 'global' });

    // state
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
      if (item?.srl && confirm(t('box.removeMessage')))
      {
        await removeItems('box', item.srl);
        await removeItems('board', item.srl, 'box');
        state.loading = true;
        state.items = await fetchItems();
        state.loading = false;
      }
    };
    const gotoList = () => {
      state.selectedItem = null;
      state.mode = 'list';
    };
    const onSubmitManage = async (updatedSrl) => {
      gotoList();
      state.loading = true;
      state.items = await fetchItems();
      state.loading = false;
      if (updatedSrl) emit('update', updatedSrl);
    }
    const fetchItems = async () => {
      let items = await getItems('box');
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
    'update': null,
    'close': null,
  },
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
