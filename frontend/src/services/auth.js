import AxiosConfig from "./AxiosConfig"

export default {
  signup(data) {
    return AxiosConfig().post("users/signup", data)
  },
  login(data) {
    return AxiosConfig().post("users/login", data)
  },
  deleteUser(id) {
    return AxiosConfig().delete("users/profile/" + id)
  },

  updateUser(id, data) {
    return AxiosConfig.put("users/profile/" + id, data)
  },
  getUsers() {
    return AxiosConfig().get("users/profile")
  },
  getUserById(id) {
    return AxiosConfig().get("users/profile/" + id)
  },
}