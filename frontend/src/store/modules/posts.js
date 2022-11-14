const fetchPostsUrl = `http://localhost:3000/api/posts`

const state = {
  posts: [],
};
console.log("state", state)

const getters = {
  posts: (state) => state.posts,
};
console.log("getters", getters)

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
  async addPost({ commit }, payload) {
    console.log("PAYLOAD STORE", payload)

    const fd = new FormData()
    fd.append("title", payload.title)
    fd.append("content", payload.content)
    fd.append("imageUrl", payload.imageUrl)

    for (const pair of fd.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    let response = await fetch(fetchPostsUrl + `/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: fd
    })
    let data = await response.json()
    console.log("data", data.post)
    console.log("data||title", data.post.title)
    console.log("data||content", data.post.content)
    console.log("data||imageUrl", data.post.imageUrl)
    commit('newPost', data.post)
  },

  //delete a post
  async deletePost({ commit }, postId) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log("store||deletePost||postId", postId);
    if (userId === userId && token === token) {
      await fetch(fetchPostsUrl + `/${postId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("deletePost || res", res);
          commit("removePost", res)
        })
        .catch((err) => console.error(err));
    }
  },

  //update a post
  async updatePost({ commit }, payload) {
    console.log("payload", payload)
    console.log("postId", payload.postId)

    const post = {
      postId: payload.postId,
      title: payload.title,
      content: payload.content,
      imageUrl: payload.imageUrl,
    };
    console.log("ModifyPost||post", post);

    const fd = new FormData();
    fd.append("imageUrl", post.imageUrl);
    fd.append("title", post.title);
    fd.append("content", post.content);

    let response = await fetch(fetchPostsUrl + `/${payload.postId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: fd
    })
    let data = await response.json()
    console.log("data", data.newPost)
    console.log("data||title", data.newPost.title)
    console.log("data||content", data.newPost.content)
    console.log("data||imageUrl", data.newPost.imageUrl)
    commit('updatePost', data.newPost)
  },

  //add a comment
  async addComment({ commit }, payload) {
    console.log("ADDCOMMENT")
    console.log("payload", payload)

    const comment = {
      postId: payload.postId,
      content: payload.content,
    }
    console.log("comment", comment)

    let response = await fetch(`http://localhost:3000/api/posts/${payload.postId}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        comment
      })

    })

    let data = await response.json()


    commit('newComment', data.comment)
    this.content = "";

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
    console.log("state", state)
    console.log("post", post)
    state.posts.unshift(post)
  },

  //delete a post
  removePost: (state, postId) => {
    state.posts = state.posts.splice(post => postId == post.id)
  },

  //update a post
  updatePost: (state, postId) => {
    state.posts.push(post => postId == post.id)
  },

  //add a comment
  newComment: (state, comment) => {
    //ajouter comment dans le bon post du state posts
    console.log("state||", this.store.posts)
    console.log("comment||", comment)
    //  state.comments.unshift(comment)
  },

};
console.log("mutations", mutations)
export default {
  state,
  getters,
  actions,
  mutations
}

