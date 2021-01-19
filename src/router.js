import { createWebHistory, createRouter } from "vue-router";

import AboutPage from './pages/AboutPage.vue';
import MainPage from './pages/MainPage.vue';
import ContactPage from './pages/ContactPage.vue';
import PlayPage from './pages/PlayPage.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: MainPage,
    },
    {
        path: "/about",
        name: "about",
        component: AboutPage,
    },
    {
        path: "/contact",
        name: "contact",
        component: ContactPage,
    },
    {
        path: "/text",
        name: "text",
        component: PlayPage,
        props: true,
        params: {type: 'text'}
    },
    {
        path: "/song",
        name: "song",
        component: PlayPage,
        props: true,
        params: {type: 'song'}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;