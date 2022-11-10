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
    console.log("postId", payload.postId)

    const fd = new FormData()
fd.append("content", payload.content)
for (const pair of fd.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    
    let response = await fetch(`http://localhost:3000/api/posts/${payload.postId}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: fd
    })

    let data = await response.json()
    console.log("data", data)
    console.log("data||content", data.comment.content)
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
    console.log("state", state)
    console.log("comment", comment)
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