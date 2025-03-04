import {createRouter, createWebHistory} from 'vue-router';
import PrincipalPageComponent from "../pages/principal.component.vue";
import SignUpPageComponent from "../iam/pages/sign-up.component.vue";
import SignInPageComponent from "../iam/pages/sign-in.component.vue";
import UserPortfoliosPageComponent from "../invoices/pages/user-portfolios.component.vue";
import PortfolioInvoicesPageComponent from "../invoices/pages/portfolio-invoices.component.vue";
import SupportPageComponent from "../pages/support.component.vue";
import AccountPageComponent from "../pages/account.component.vue";
import {useAccountStore} from "../stores/account.store.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: PrincipalPageComponent, meta: { title: 'Menú Principal', requiresAuth: true} },
        { path: '/portfolios', name: 'portfolios', component:UserPortfoliosPageComponent, meta: { title: 'Portafolios', requiresAuth: true} },
        { path: '/invoices/:id', name: 'invoices', component:PortfolioInvoicesPageComponent, meta: { title: 'Facturas', requiresAuth: true} },
        { path: '/support', name: 'Support', component: SupportPageComponent, meta: { title: 'Soporte al cliente', requiresAuth: true} },
        { path: '/account', name: 'Account', component: AccountPageComponent, meta: { title: 'Mi Cuenta', requiresAuth: true} },
        { path: '/sign-up', name: 'sign-up', component: SignUpPageComponent, meta: { title: 'Sign Up'} },
        { path: '/sign-in', name: 'sign-in', component: SignInPageComponent, meta: { title: 'Sign In'} },
        { path: '/', redirect: '/home'}
    ]
});

router.beforeEach((
    to,
    from,
    next) => {
    let baseTitle = 'LetterMaster';
    document.title = `${baseTitle} - ${to.meta['title']}`;


    const accountStore = useAccountStore();
    if (to.matched.some(record => record.meta.requiresAuth) && !accountStore.isSignedIn) {
        next({ name: 'sign-in' });
    } else {
        next();
    }
});
export default router;