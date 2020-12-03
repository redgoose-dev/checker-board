import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import app from './app.vue';
import store from './store';
import messages from './messages';

// import scss
import './css/app.scss';

// call with I18n option
const i18n = createI18n({
  locale: 'ko',
  fallbackLocale: 'en',
  messages,
});

// play app
createApp(app)
  .use(store)
  .use(i18n)
  .mount('#app');
