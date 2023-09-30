import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import { i18n, languageNames } from './i18n.js';
import { API } from './api'
import '../node_modules/bulma/bulma.sass';

import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseCard from './components/ui/BaseCard.vue';

const PinnedMessage = defineAsyncComponent(() => import('./components/ui/PinnedMessage.vue'));

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.component('base-spinner', BaseSpinner);
app.component('base-card', BaseCard);
app.component('pinned-message', PinnedMessage);

app.config.globalProperties.API = API;
app.config.globalProperties.languageNames = languageNames;

app.mount('#app')
