const state = {
    post: {
        title: "",
        content: "",
        imageUrl: "",
    },
    posts: [],
};

const getters = {
    allPosts: (state) => state.posts
};

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
            .then((data) => {
                commit('setAllPosts', data)
                console.log("store || getAllPosts", data)
            })            
        .catch((err) => console.log(err));
    }


    /*
      
    async ADD_POST({ commit }, {fd}) {
      return await fetch(`http://localhost:3000/api/posts/add`, {
        methods: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
        body : fd
      })
    //  }
    
  .then((res) => {
    console.log(res)
    commit("ADD_POST", res);
    return res.json();
  })
  .then((data) => console.log(data))
.catch((err) => console.error(err))},
   /*     .then(() => {
          fetch(`http://localhost:3000/api/posts/`, {
            methods: "GET", {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Authorization": `Bearer ${this.token}`,
  },
};
          })
            .then((res) => {
              const posts = res.data;
              commit("GET_POSTS", posts);
            })
        })
        .catch((err) => console.log(err))
    },*/

};

const mutations = {
    setAllPosts: (state, posts) => {
        state.posts = posts
    }

    /* GET_POSTS(state, posts) {
      state.posts = [posts];
    },
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
