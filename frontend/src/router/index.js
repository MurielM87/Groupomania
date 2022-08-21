import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
import MainPage from '@/views/MainPage';
import ProfilUser from '@/views/ProfilUser';
import EditProfil from '@/components/EditProfil';
import NotFound from '@/views/NotFound';

const routes = [
    {
        name: 'SignUp',
        path: '/signup',
        component: SignUp,
    },
    {
        name: 'LogIn',
        path: '/login',
        component: LogIn,
    },
    {
        name: 'MainPage',
        path: '/',
        component: MainPage,
        meta: { requiresAuth: true },
    },
    {
        name: 'ProfilUser',
        path: '/profil/:id',
        component: ProfilUser,
        meta: { requiresAuth: true },
    },
    {
        name: 'EditProfil',
        path: '/profil/:id/edit',
        component: EditProfil,
        meta: { requiresAuth: true },
    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)*',
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;