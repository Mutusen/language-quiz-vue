import { createI18n } from 'vue-i18n'
import en from './lang/en';
import fr from './lang/fr';
import eo from './lang/eo';

const messages = {
    en,
    fr,
    eo,
};


const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

export default i18n;