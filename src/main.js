import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import main from './main.vue';
import store from './store';
import messages from './messages';

// import scss
import './css/base.scss';

// call with I18n option
const i18n = createI18n({
  locale: 'ko',
  fallbackLocale: 'en',
  messages,
});

// play app
const app = createApp(main)
  .use(store)
  .use(i18n)
  .mount('#app');

// run development
if (process.env.NODE_ENV === 'development')
{
  require('./dev-scripts').default();
}