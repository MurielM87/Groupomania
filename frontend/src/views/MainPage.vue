<template>
  <section class="posts">
    <h2>Bonjour {{ user.pseudo }}</h2>
    <PostForm
      @createPost="addPost"
      :token="token"
      :userId="userId"
      :post="post"
      :user="user"
    />

    <div id="separate_barre"></div>
    <h2>Nouvelles publications</h2>

    <PostCard 
      v-for="post in posts" 
      :key="post.postId"
      :token="token"
    />

    <!-- Bouton Scroll to Top-->
    <button class="toTop" @click="toTop" title="Retour en haut de page">
      <span class="fa fa-chevron-up"></span>
    </button>
  </section>
</template>

<script>
import { ref } from "vue";
import PostForm from "@/components/PostForm.vue";
import PostCard from "@/components/PostCard.vue";

export default {
  name: "MainPage",
  components: {
    PostForm,
    PostCard,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      user: ref([]),
      post: ref([]),
      comment: ref([])
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token == null && userId == null) {
      this.$router.push({ name: "LogIn" });
    }
  },
  
  //getItem() {
  // 
  //  //get the user
  //  fetch(`http://localhost:3000/api/users/${this.userId}`, {
  //    method: "GET",
  //    withCredentials: true,
  //    headers: {
  //      "Content-Type": "application/json",
  //      "Authorization": `Bearer ${this.token}`,
  //    },
  //  })
  //    .then((res) => {
  //      if (res.status == 401) {
  //        this.$router.push({ name: "LogIn" });
  //        return;
  //      }
  //      return res.json();
  //    })
  //    .then((res) => {
  //      this.posts = res;
  //    });
  //},
  methods: {
    //button scroll top
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    addPost(data) {
      console.log("MainPage||addPost||data", data);
      fetch(`http://localhost:3000/api/posts/add`, {
        methods: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: {
          title: this.$post.title,
          content: this.$post.content,
          imageUrl: this.$post.imageUrl,
          pseudo: this.$user.pseudo,
          userImageUrl: this.$user.imageUrl,
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then((res) => {
          console.log("res", res);
          return res.status(201).json(("message : post publié"))
        })
        .catch((err) => {
          console.log("err", err);
          return err.status(404).json(("message: échec de la publication"))
        });
    },
  },
};
</script>

<style lang="scss">
.toTop {
  display: flex;
  margin-left: 30px;
}
</style>
