<template>
<main>
  <LayoutHeader title="하루하루의 운동운동~" class="app-header">
    <template v-slot:navRight>
      <IconButton
        title="box list"
        icon="grid"
        class="app-header__button"/>
      <IconButton
        title="preference"
        icon="setting"
        class="app-header__button"/>
    </template>
  </LayoutHeader>

</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutHeader from '@/components/Layout/Header.vue';
import IconButton from '@/components/Buttons/IconButton.vue';

export default defineComponent({
  name: 'App',
  components: {
    LayoutHeader,
    IconButton,
  },
});
</script>

<style src="./App.scss" lang="scss" scoped></style>
