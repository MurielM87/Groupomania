import { createStore } from 'vuex'
import posts from "./modules/posts"
import comments from "./modules/comments"
import likes from "./modules/likes"

export default createStore({
  modules: {
    posts,
    comments,
    likes
  },
})
