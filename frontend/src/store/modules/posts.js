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
    //get all posts
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
            .catch((err) => console.error(err));
    },

    //add a post
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
                commit("newPost", res.data);
                return res.json();
            })
            .catch((err) => console.error(err))
        )        
    }, 
};
console.log("actions", actions)

const mutations = {
    //get all posts
    setAllPosts: (state, posts) => {
        state.posts = posts
    },

    //add a post
    newPost: (state, post) => {
        state.posts.unshift(post)
    }

};
console.log("mutations", mutations)
export default {
    state,
    getters,
    actions,
    mutations
}
