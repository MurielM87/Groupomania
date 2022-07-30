import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
import MainPage from '@/views/MainPage';
import ProfilUser from '@/views/ProfilUser';
import EditProfil from '@/components/EditProfil';
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
        path: '/',
        component: MainPage,
    },
    {
        name: 'ProfilUser',
        path: '/profil',
        component: ProfilUser,
    },
    {
        name: 'EditProfil',
        path: '/edit-profil',
        component: EditProfil,
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

router.beforeEach((to) => {
    if (isLoginRequired(to)) {
        return router.push("/login")
    }
})

function isLoginRequired(to) {
    if (!isPrivatePage(to)) return false
    if (!isTokenInCache()) return true
    return false
}

function isPrivatePage(to) {
    const publicPages = ["/login", "/signup"]
    return !publicPages.includes(to.path)
}

function isTokenInCache() {
    return localStorage.getItem("token") != null
}


export default router;