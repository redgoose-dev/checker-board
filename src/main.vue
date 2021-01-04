<template>
  <article v-if="error" class="error">
    <div class="error__wrap">
      <h1 class="error__title">
        {{$t(`error.${error}.title`)}}
      </h1>
      <p class="error__description">
        {{$t(`error.${error}.description`)}}
      </p>
      <nav class="error__nav">
        <buttons-basic :inline="true" @click="onClickReload">
          새로고침
        </buttons-basic>
        <buttons-basic :inline="true" skin="red" @click="onClickResetData">
          재설정
        </buttons-basic>
      </nav>
    </div>
  </article>
  <Suspense v-else>
    <template #default>
      <app/>
    </template>
    <template #fallback>
      <div class="loading-wrap">
        <loading/>
      </div>
    </template>
  </Suspense>
</template>

<script>
import { defineComponent, onErrorCaptured, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import * as storage from '@/libs/storage';
import { removeDatabase } from '@/libs/model';
import { initCustomEvent } from '@/libs/util';
import App from '@/components/app';
import Loading from '@/components/etc/loading';
import ButtonsBasic from '@/components/buttons/basic';

export default defineComponent({
  name: 'app-main',
  components: {
    'loading': Loading,
    'app': App,
    'buttons-basic': ButtonsBasic,
  },
  setup()
  {
    const { t } = useI18n({ useScope: 'global' });

    // error
    const error = ref(null);
    onErrorCaptured(e => {
      if (process.env.NODE_ENV === 'development' && typeof e !== 'string')
      {
        console.error(e);
      }
      switch (e)
      {
        case 'NOT_SUPPORT':
          error.value = 'notSupport';
          break;
        default:
          error.value = 'unknown';
          break;
      }
    });

    // methods
    const onClickReload = () => {
      location.reload();
    };
    const onClickResetData = async () => {
      if (!confirm(t('preference.reset.confirm'))) return;
      await removeDatabase();
      storage.remove('preference');
      location.reload();
    };

    // lifecycles
    onMounted(() => {
      initCustomEvent();
    });

    return {
      error,
      onClickReload,
      onClickResetData,
    };
  },
});
</script>

<style src="./main.scss" lang="scss" scoped></style>
