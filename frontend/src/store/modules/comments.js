const state = {
  comment: {
    content: ""
  },
  comments: [],
};

const getters = {
  comments: (state) => state.comments
};

const actions = {
  //add a comment
  async addComment({ commit }, payload) {
    console.log("payload", payload)
    console.log("content", payload.content)
    console.log("postId", payload.postId)
    let response = await fetch(`http://localhost:3000/api/posts/${payload.postId}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        content: payload.content
      }),
    })

    let data = await response.json()
    console.log(data)
    commit('newComment', data.comment)    
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
    console.log(data)
    commit('removeComment', data.comment)
  },
};

const mutations = {
  //add a comment
  newComment: (state, comment) => {
    state.comments.unshift(comment)
  },

  //delete a comment
  removeComment: (state, commentId) => {
    state.comments.splice(comment => commentId == comment.id)
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}