const state = {
  likes: [],
  dislikes: [],
};

const getters = {
  likes: (state) => state.likes,
  dislikes: (state) => state.dislikes
};

const actions = {
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
  //add a like
  newLike: (state, like) => {
    state.likes.unshift(like)
  },

  //add a dislike
  newDislike: (state, dislike) => {
    state.likes.unshift(dislike)
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}