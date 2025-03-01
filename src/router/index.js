import {createRouter, createWebHistory} from 'vue-router';
import PrincipalPageComponent from "../pages/principal.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'Home', component: PrincipalPageComponent, meta: { title: 'Home' } },
        { path: '/', redirect: '/home'}
    ]
});

router.beforeEach((
    to,
    from,
    next) => {
    let baseTitle = 'LetterMaster';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    next();
});
export default router;