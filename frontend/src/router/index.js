import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
import MainPage from '@/views/MainPage';
import ProfilUser from '@/views/ProfilUser';
import EditProfil from '@/components/EditProfil';
import UsersProfil from '@/components/UsersProfil'
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
    },
    {
        name: 'ProfilUser',
        path: '/profil/:id',
        component: ProfilUser,
    },
    {
        name: 'EditProfil',
        path: '/profil/:id/edit',
        component: EditProfil,
    },
    {
        name: 'UsersProfil',
        path:'/profils',
        component: UsersProfil,
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