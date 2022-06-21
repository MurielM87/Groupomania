import AxiosConfig from "./AxiosConfig"

export default {
  getPosts() {
    return AxiosConfig().get("posts")
  },

  getPostById(id) {
    return AxiosConfig().get("posts/" + id)
  },
  createPost(data) {
    return AxiosConfig().post("posts/add", data)
  },
  updatePost(id, data) {
    return AxiosConfig.put("posts/" + id, data)
  },

  deletePost(id) {
    return AxiosConfig().delete("posts/" + id)
  },
  likePost(id) {
    return AxiosConfig().post("posts/" + id) + "/like"
  },

  commentPost(id, data) {
    return AxiosConfig().post("posts/" + id + "/comments", data)
  },

  deleteComment(id) {
    return AxiosConfig().delete("posts/comments/" + id)
  },
}