<template>
  <label class="forms-select">
    <select
      :name="name"
      :id="id"
      :value="modelValue"
      class="forms-select__unit"
      @change="$emit('update:modelValue', $event.target.value)">
      <slot/>
    </select>
    <icons icon="down" class="forms-select__icon"/>
  </label>
</template>

<script>
import { defineComponent } from 'vue';
import Icons from '@/components/icons/index.vue';
export default defineComponent({
  name: 'forms-select',
  components: {
    'icons': Icons,
  },
  props: {
    name: { type: String, required: true },
    id: String,
    modelValue: [String, Number],
  },
  emits: {
    'update:modelValue': null,
  },
});
</script>

<style src="./select.scss" lang="scss" scoped></style>
