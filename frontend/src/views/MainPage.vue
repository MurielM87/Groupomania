<template>
  <NavBar />
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
import NavBar from "@/components/NavBar.vue";

export default {
  name: "MainPage",
  components: {
    PostForm,
    PostCard,
    NavBar
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
  
  async created() {
    await fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("MainPage||profil||data", data);
        this.user = data;
      })
      .catch((err) => console.log(err));
    },
 
  
  methods: {
    //button scroll top
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    addPost(data) {
      fetch(`http://localhost:3000/api/posts/add`, {
        methods: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
        body: {
          title: this.$post.title,
          content: this.$post.content,
          imageUrl: this.$post.imageUrl,
          userId: this.$user.userId,
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
      console.log("MainPage||addPost||data", data);
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
