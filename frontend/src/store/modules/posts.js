const fetchPostsUrl = `http://localhost:3000/api/posts`

const state = {
  posts: [],
};


const getters = {
  posts: (state) => state.posts,
};


const actions = {
  //get all posts
  async getAllPosts({ commit }) {
    await fetch(fetchPostsUrl, {
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
  async addPost({ commit}, payload ) {
    console.log("payload", payload)  
    
    let response = await fetch(`http://localhost:3000/api/posts/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        title: payload.title,
        content: payload.content,
        imageUrl: payload.imageUrl
      }),
    })
    let data = await response.json()
    console.log("data", data.post)
    console.log("data||title", data.post.title)
    console.log("data||content", data.post.content)
    console.log("data||imageUrl", data.post.imageUrl)
    commit('newPost', data.post)
  },

  //delete a post
  async deletePost({ dispatch }, postId) {
    console.log("store||deletePost||postId", postId);

    await fetch(fetchPostsUrl + `/${postId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
    await dispatch('getAllPosts')
  },

  //update a post
  async updatePost({commit}, payload) {
    console.log("payload", payload)  
    
    let response = await fetch(`http://localhost:3000/api/posts/:id`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        title: payload.title,
        content: payload.content,
        imageUrl: payload.imageUrl
      }),
    })
    let data = await response.json()
    console.log("data", data.post)
    console.log("data||title", data.post.title)
    console.log("data||content", data.post.content)
    console.log("data||imageUrl", data.post.imageUrl)
    commit('modifyPost', data.post)
  }
};


const mutations = {
  //get all posts
  setAllPosts: (state, posts) => {
    state.posts = posts
  },

  //add a post
  newPost: (state, post) => {
    state.posts.unshift(post)
  },

  //delete a post
  removePost: (state, postId) => {
    state.posts.filter(post => postId == post.id)
  },

  //update a post
  updatePost: (state, postId) => {
    state.posts.push(post => postId == post.id )
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}

