import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [

    ]
});

router.beforeEach((
    to,
    from,
    next) => {
    let baseTitle = 'LetterMaster';
    document.title = `${baseTitle} - ${to.meta['title']}`;
});
export default router;