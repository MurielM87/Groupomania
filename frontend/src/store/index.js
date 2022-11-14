import { createStore } from 'vuex'
import posts from "./modules/posts"

export default createStore({
  modules: {
    posts,
  },
})
