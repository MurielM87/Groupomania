import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: {},
        isLoggedIn: false,
        isLoading: false,

        posts: [],
        users: [],
        post: {},
        message: "",
        error: "",
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    getters: {
        posts(state) {
            return state.posts;
        },
        post(state) {
            return state.post;
        },
        users(state) {
            return state.users;
        },
        user(state) {
            return state.user;
        },
        messageRetour(state) {
            return state.message;
        },
        errorMessage(state) {
            return state.error;
        },
        isLogged(state) {
            return state.isLoggedIn;
        },
    },

    mutations: {
        // users
        SET_TOKEN(state, token) {
            state.token = token;
            if (token) {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
            }
        },
        DELETE_TOKEN(state) {
            state.token = null;
            state.user = "";
            state.isLoggedIn = false;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        GET_USER_BY_ID(state, user) {
            state.user = user;
        },
        GET_USERS(state, users) {
            state.users = users;
        },
        UPDATE_ACCOUNT(state, id, user) {
            Object.assign(
                state.users.find((element) => element.id === id),
                user
            );
            state.message = "compte modifié";
        },
        DELETE_ACCOUNT(state, id) {
            state.users = [...state.users.filter((element) => element.id !== id)];
            state.message = "compte supprimé";
        },
        LOG_OUT(state) {
            sessionStorage.clear();
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
            state.message = "";
            state.error = "";
        },

        // posts
        GET_POSTS(state, posts) {
            (state.posts = posts), (state.isLoading = false);
        },
        GET_POST_BY_ID(state, post) {
            state.post = post;
            state.isLoading = false;
        },
        ADD_POST(state, post) {
            state.posts = [post, ...state.posts];
            state.message = "post créé";
        },
        UPDATE_POST(state, id, post) {
            Object.assign(
                state.posts.find((element) => element.id === id),
                post
            );

            state.message = "Votre post est bien modifié";
        },

        DELETE_POST(state, id) {
            state.posts = [...state.posts.filter((element) => element.id !== id)];
            state.message = "post supprimé";
        },

        // comments
        COMMENT_POST(state, comment) {
            state.posts = [comment, ...state.posts];
            state.message = "post commenté";
        },
        DELETE_COMMENT(state, id) {
            state.posts = [...state.posts.filter((element) => element.id !== id)];
            state.message = "commentaire supprimé";
        },

        // like
        LIKE_POST(state, like) {
            state.posts = [like, ...state.posts];
        },
    },
    actions: {
        //users
        setToken({ commit }, token) {
            commit("SET_TOKEN", token);
        },
        deleteToken({ commit }, token) {
            commit("DELETE_TOKEN", token);
        },
        logOut({ commit }) {
            commit("LOG_OUT");
        },
        setUser({ commit }, user) {
            commit("SET_USER", user);
        },
        getUsers({ commit }) {
            Auth.getUsers().then((response) => {
                const users = response.data;
                commit("GET_USERS", users);
            });
        },
        getUserById({ commit }) {
            let id = this.state.user.id;
            Auth.getUserById(id).then((response) => {
                const user = response.data;
                commit("GET_USER_BY_ID", user);
            });
        },
        deleteAccount({ commit }, id) {
            Auth.deleteAccount(id).then(() => {
                commit("DELETE_ACCOUNT", id);
            })
        },
        updateAccount({ commit }, data) {
            let id = this.state.user.id;
            fetch(`http://localhost:3000/api/users/accounts/${id}`, data, {
                method: "PUT",
                headers: { Authorization: this.state.token },
            })
                .then((response) => {
                    const newUser = response.data;
                    commit("UPDATE_ACCOUNT", id, newUser);
                })
                .then(() => {
                    PostService.getPosts().then((response) => {
                        const posts = response.data;
                        commit("GET_POSTS", posts);
                    })
                })
        },

        // posts
        getPosts({ commit }) {
            PostService.getPosts().then((response) => {
                const posts = response.data;
                commit("GET_POSTS", posts);
            });
        },
        getHotPosts({ commit }) {
            PostService.getHotPosts().then((response) => {
                const posts = response.data;
                commit("GET_HOT_POSTS", posts);
            });
        },

        getPostById({ commit }, id) {
            PostService.getPostById(id).then((response) => {
                const post = response.data;
                commit("GET_POST_BY_ID", post);
            });
        },
        createPost({ commit }, post) {
            PostService.createPost(post)
                .then((response) => {
                    const post = response.data;
                    commit("ADD_POST", post);
                })
                .then(() => {
                    PostService.getPosts().then((response) => {
                        const posts = response.data;
                        commit("GET_POSTS", posts);
                    });
                });
        },
        updatePost({ commit }, data) {
            let id = this.state.post.id;
            fetch(`http://localhost:3000/api/post/${id}`, data, {
                method: "PUT",
                headers: { Authorization: this.state.token },
            })
                .then((response) => {
                    const post = response.data;
                    commit("UPDATE_POST", id, post);
                });
        },
        deletePost({ commit }, id) {
            PostService.deletePost(id)
                .then(() => {
                    commit("DELETE_POST", id);
                })
                .then(() => {
                    PostService.getPosts().then((response) => {
                        const posts = response.data;
                        commit("GET_POSTS", posts);
                    });
                });
        },

        //like
        likePost({ commit }, payload) {
            fetch(`http://localhost:3000/api/posts/${payload.id}/like`,
                payload.data, {
                method: "POST",
                headers: { Authorization: this.state.token }
            }
            )
                .then((response) => {
                    const like = response.data;
                    commit("LIKE_POST", like);
                })
                .then(() => {
                    PostService.getPosts().then((response) => {
                        const posts = response.data;
                        commit("GET_POSTS", posts);
                    });
                });
        },

        // comment
        commentPost({ commit }, payload) {
            fetch(`http://localhost:3000/api/posts/${payload.id}/comments`,
                payload.data, {
                method: "POST",
                headers: { Authorization: this.state.token }
            }
            )
                .then((response) => {
                    const comment = response.data;
                    commit("COMMENT_POST", comment);
                })
                .then(() => {
                    PostService.getPosts().then((response) => {
                        const posts = response.data;
                        commit("GET_POSTS", posts);
                    });
                });
        },
        deleteComment({ commit }, id) {
            PostService.deleteComment(id)
                .then(() => {
                    commit("DELETE_COMMENT", id);
                })
                .then(() => {
                    PostService.getPosts().then((response) => {
                        const posts = response.data;
                        commit("GET_POSTS", posts);
                    });
                });
        },
    },
});