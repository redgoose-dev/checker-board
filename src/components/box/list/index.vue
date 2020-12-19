<template>
  <article class="box-list">
    <h2 class="box-list__title">Box list</h2>
    <loading v-if="loading"/>
    <ul v-else class="box-list__index">
      <li v-for="(o,k) in items" :key="k">
        <item
          :title="o.name"
          :description="o.description"
          :reset="o.reset"
          :active="o.active"
          @click-item="$emit('click-item', o.srl)"
          @click-edit="$emit('click-edit', o)"
          @click-remove="$emit('click-remove', o)"/>
      </li>
    </ul>
  </article>
</template>

<script>
import { defineComponent } from 'vue';
import Loading from '@/components/etc/loading';
import Item from './item';
export default defineComponent({
  name: 'box-list',
  components: {
    'loading': Loading,
    'item': Item,
  },
  props: {
    loading: { type: Boolean, default: true },
    items: Array,
  },
  emits: {
    'click-item': null,
    'click-edit': null,
    'click-remove': null,
  },
})
</script>

<style src="./index.scss" lang="scss" scoped></style>
