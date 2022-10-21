const state = {
    post: {
        title: "",
        content: "",
        imageUrl: "",
    },
    posts: [],
};
console.log("state", state)
const getters = { 
    allPosts: (state) => state.posts, 
}; 
console.log("getters", getters)
const actions = {
    async getAllPosts({ commit }) {
        await fetch(`http://localhost:3000/api/posts`, {
            methods: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": `Bearer ${this.token}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                commit('setAllPosts', res)
                console.log("store || getAllPosts", res)
            })
            .catch((err) => console.log(err));
    },

    async addPost({ commit }) {
        return await fetch(`http://localhost:3000/api/posts/add`, {
            methods: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": `Bearer ${this.token}`,
            },
        }
            .then((res) => res.json())
            .then((res) => {
                console.log("addpost", res)
                commit("addPost", res);
                return res.json();
            })
            .catch((err) => console.error(err))
        )
    },
};

    const mutations = {
        setAllPosts: (state, posts) => {
            state.posts = posts
        }

        /* 
        ADD_POST(state, post) {
          state.posts = [...state.posts, post];
          console.log("mutation", post)
        },
        DELETE_POST(state, id) {
          state.posts = [...state.posts.filter((element) => element.id !== id)];
        },
        UPDATE_POST(state, id, post) {
          state.posts.find((element) => element.id === id),
            post
        },*/
    };

    export default {
        state,
        getters,
        actions,
        mutations
    }
