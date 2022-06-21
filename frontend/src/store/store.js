import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import PostApi from "../services/PostApi"
import Auth from "../services/Auth"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: {},
    isLoggedIn: false,
    isLoading: false,

    posts: [],
    users: [],
    post: {},
    message: "",
    error: "",
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  getters: {
    posts(state) {
      return state.posts
    },
    post(state) {
      return state.post
    },
    users(state) {
      return state.users
    },
    user(state) {
      return state.user
    },

    isLogged(state) {
      return state.isLoggedIn
    },
  },

  mutations: {
    // users
    SET_TOKEN(state, token) {
      state.token = token
      if (token) {
        state.isLoggedIn = true
      } else {
        state.isLoggedIn = false
      }
    },
    DELETE_TOKEN(state) {
      state.token = null
      state.user = ""
      state.isLoggedIn = false
    },
    SET_USER(state, user) {
      state.user = user
    },
    GET_USER_BY_ID(state, user) {
      state.user = user
    },
    GET_USERS(state, users) {
      state.users = users
    },
    UPDATE_USER(state, id, user) {
      Object.assign(
        state.users.find((element) => element.id === id),
        user
      )
      state.message = "compte modifié"
    },
    DELETE_USER(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)]
      state.message = "compte supprimé"
    },
    LOG_OUT(state) {
      sessionStorage.clear()
      state.token = null
      state.user = null
      state.isLoggedIn = false
      state.message = ""
      state.error = ""
    },
    // end users

    // posts

    GET_POSTS(state, posts) {
      state.posts = posts
      state.isLoading = false
    },

    GET_POST_BY_ID(state, post) {
      state.post = post
      state.isLoading = false
    },
    ADD_POST(state, post) {
      state.posts = [post, ...state.posts]
      state.message = "post créé"
    },
    UPDATE_POST(state, id, post) {
      Object.assign(
        state.posts.find((element) => element.id === id),
        post
      )

      state.message = "Votre post est bien modifié"
    },

    DELETE_POST(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)]
      state.message = "post supprimé"
    },
    // end posts

    // comments
    COMMENT_POST(state, comment) {
      state.posts = [comment, ...state.posts]
      state.message = "post commenté"
    },
    DELETE_COMMENT(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)]
      state.message = "commentaire supprimé"
    },
    // end comments

    // like

    LIKE_POST(state, like) {
      state.posts = [like, ...state.posts]
    },
    // end like
  },
  actions: {
    //users
    setToken({ commit }, token) {
      commit("SET_TOKEN", token)
    },
    deleteToken({ commit }, token) {
      commit("DELETE_TOKEN", token)
    },
    logOut({ commit }) {
      commit("LOG_OUT")
    },
    setUser({ commit }, user) {
      commit("SET_USER", user)
    },
    getUsers({ commit }) {
      Auth.getUsers().then((response) => {
        const users = response.data
        commit("GET_USERS", users)
      })
    },
    getUserById({ commit }) {
      let id = this.state.user.id
      Auth.getUserById(id).then((response) => {
        const user = response.data
        commit("GET_USER_BY_ID", user)
      })
    },
    deleteUser({ commit }, id) {
      Auth.deleteUser(id).then(() => {
        commit("DELETE_USER", id)
      })
    },
    updateUser({ commit }, data) {
      let id = this.state.user.id
      axios
        .put(`http://localhost:3000/api/users/profile/${id}`, data, {
          headers: { Authorization: this.state.token },
        })
        .then((response) => {
          const newUser = response.data
          commit("UPDATE_USER", id, newUser)
        })
      //.then(() => {
      //  PostApi.getPosts().then((response) => {
      //   const posts = response.data
      //  commit("GET_POSTS", posts)
      // })
      //})
    },
    // end users

    // posts

    getPosts({ commit }) {
      PostApi.getPosts().then((response) => {
        const posts = response.data
        commit("GET_POSTS", posts)
      })
    },

    getPostById({ commit }, id) {
      PostApi.getPostById(id).then((response) => {
        const post = response.data
        commit("GET_POST_BY_ID", post)
      })
    },
    createPost({ commit }, post) {
      PostApi.createPost(post)
        .then((response) => {
          const post = response.data
          commit("ADD_POST", post)
        })
        .then(() => {
          PostApi.getPosts().then((response) => {
            const posts = response.data
            commit("GET_POSTS", posts)
          })
        })
    },
    updatePost({ commit }, data) {
      let id = this.state.post.id
      axios
        .put(`http://localhost:3000/api/posts/${id}`, data, {
          headers: { Authorization: this.state.token },
        })
        .then((response) => {
          const post = response.data
          commit("UPDATE_POST", id, post)
        })
    },
    deletePost({ commit }, id) {
      PostApi.deletePost(id).then(() => {
        commit("DELETE_POST", id)
      })
    },

    // end posts

    //like
    likePost({ commit }, payload) {
      axios
        .post(
          `http://localhost:3000/api/posts/${payload.id}/like`,
          payload.data,
          { headers: { Authorization: this.state.token } }
        )
        .then((response) => {
          const like = response.data
          commit("LIKE_POST", like)
        })
        .then(() => {
          PostApi.getPosts().then((response) => {
            const posts = response.data
            commit("GET_POSTS", posts)
          })
        })
    },

    // end like

    // comment
    commentPost({ commit }, payload) {
      axios
        .post(
          `http://localhost:3000/api/posts/${payload.id}/comments`,
          payload.data,
          { headers: { Authorization: this.state.token } }
        )
        .then((response) => {
          const comment = response.data
          commit("COMMENT_POST", comment)
        })
        .then(() => {
          PostApi.getPosts().then((response) => {
            const posts = response.data
            commit("GET_POSTS", posts)
          })
        })
    },
    deleteComment({ commit }, id) {
      PostApi.deleteComment(id).then(() => {
        commit("DELETE_COMMENT", id)
      })
    },
  },
})