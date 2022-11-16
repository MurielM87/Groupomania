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
  async addPost({ dispatch }, payload) {
    console.log("PAYLOAD STORE", payload)

    const fd = new FormData()
    fd.append("title", payload.title)
    fd.append("content", payload.content)
    fd.append("imageUrl", payload.imageUrl)

    for (const pair of fd.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    await fetch(fetchPostsUrl + `/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: fd
    })
    await dispatch('getAllPosts')
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
  async updatePost({ dispatch }, payload) {
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

    await fetch(fetchPostsUrl + `/${payload.postId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: fd
    })
    await dispatch('getAllPosts')
  },

  //add a comment
  async addComment({ dispatch }, payload) {
    console.log("ADDCOMMENT")
    console.log("payload", payload)

    const comment = {
      postId: payload.postId,
      content: payload.content,
    }
    console.log("comment", comment)

    await fetch(`http://localhost:3000/api/posts/${payload.postId}/comment`, {
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
    await dispatch('getAllPosts')
  },

  //delete a comment
  async deleteComment({ dispatch }, commentId) {
    console.log("deleteComment", commentId)
    confirm("Voulez-vous vraiment supprimer ce commentaire ?");
    await fetch(`http://localhost:3000/api/posts/comment/${commentId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
    await dispatch('getAllPosts')

  },

  //add a like
  async addLike({ dispatch }, payload) {
    console.log("payload", payload)

    await fetch(`http://localhost:3000/api/posts/${payload.postId}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
    dispatch('getAllPosts')
  },

  //add a dislike
  async addDislike({ dispatch }, payload) {
    console.log("payload", payload)


    await fetch(`http://localhost:3000/api/posts/${payload.postId}/dislike`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })

    dispatch('getAllPosts')
  },
};


const mutations = {
  //get all posts
  setAllPosts: (state, posts) => {
    state.posts = posts
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}

