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
 /* async addComment({ commit }, payload) {
    console.log("payload", payload)
    console.log("postId", payload.postId)

    const comment = {
      postId : payload.postId,
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

  },*/

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
/*  newComment: (state, comment) => {
    //ajouter comment dans le bon post du state posts
    console.log("state||", this.store.posts)
    console.log("comment||", comment)
  //  state.comments.unshift(comment)
  },*/

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