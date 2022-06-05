import {createRouter, createWebHistory} from 'vue-router';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
import MainPage from '@/views/MainPage';
import ProfilUser from '@/components/ProfilUser';
import LogOut from '@/views/LogOut';

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
        path: '/home',
        component: MainPage,
    },
    {
        name: 'ProfilUser',
        path: '/profil',
        component: ProfilUser,
    },
    {
        name: 'LogOut',
        path: '/logout',
        component: LogOut,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;