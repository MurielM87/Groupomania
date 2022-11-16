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
    console.log("data", data.post)
    commit('updatePost', data.post)
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
    commit('newComment', data.post)
    this.content = "";
  },

  //delete a comment
  async deleteComment({ commit }, commentId) {
    console.log("deleteComment", commentId)
    confirm("Voulez-vous vraiment supprimer ce commentaire ?");
    let response = await fetch(`http://localhost:3000/api/posts/comment/${commentId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })

    let data = await response.json()
    console.log("data", data)
    console.log("data.post", data.post)
    commit('removeComment', data.post)
  },

  //add a like
  async addLike({ commit }, payload) {
    console.log("payload", payload)

    let response = await fetch(`http://localhost:3000/api/posts/${payload.postId}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })

    let data = await response.json()
    console.log("data||like", data)
    commit('newLike', data)
  },

  //add a dislike
  async addDislike({ commit }, payload) {
    console.log("payload", payload)


    const response = await fetch(`http://localhost:3000/api/posts/${payload.postId}/dislike`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })

    let data = await response.json()
    console.log("data||dislike", data)
    commit('newDislike', data)
  },
};


const mutations = {
  /*
increment (state, payload){
      return state.count = state.count + payload.amount;
    },
  */

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
    console.log("state||newComment", state)
    console.log("comment||newComment", comment)
    state.posts.unshift(comment)
  },

  //delete a comment
  removeComment: (state, commentId) => {
    console.log("mutation||state", state)
    console.log("mutation||commentId", commentId)
    state.posts.splice(comment => commentId == comment.id)
  },

  //add a like
  newLike: (state, like) => {
    state.posts.unshift(like)
  },

  //add a dislike
  newDislike: (state, dislike) => {
    state.posts.unshift(dislike)
  }


};

export default {
  state,
  getters,
  actions,
  mutations
}

