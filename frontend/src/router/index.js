import {createRouter, createWebHistory} from 'vue-router';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;