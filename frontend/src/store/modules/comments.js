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
  async addComment({ commit }, postId) {
    console.log("postId", postId)
    if (this.content === "") {
      return;
    } else {
      console.log("content", this.content)
      await fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("store||res", res);
          commit('newComment', res)
        })
        .catch((err) => console.error(err));
      this.content = "";
    }
  },

  //delete a comment
  async deleteComment({ commit }, commentId) {
    console.log("deleteComment", commentId)
    confirm("Voulez-vous vraiment supprimer ce commentaire ?");
    fetch(`http://localhost:3000/api/posts/comment/${commentId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("delete comment")
        commit('removeComment', res)
      })
      .catch((err) => console.log(err));
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