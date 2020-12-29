<template>
  <header class="header">
    <nav v-if="$slots.navLeft" class="header__nav left">
      <slot name="navLeft"/>
    </nav>
    <h2 v-if="title" class="header__title">{{title}}</h2>
    <nav v-if="$slots.navRight" class="header__nav right">
      <slot name="navRight"/>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'app-header',
  components: {},
  props: {
    title: String,
  },
  setup()
  {
    return {};
  },
});
</script>

<style src="./header.scss" lang="scss" scoped></style>