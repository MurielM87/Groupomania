<template>
  <section class="posts">
    <PostForm :createPost="createPost" />

    <div id="separate_barre"></div>
    <h2>Nouvelles publications</h2>

    <PostCard
      v-for="post in posts"
      :key="post.postId"
      :post="post"
      
      :addLike="addLike"
      :addComment="addComment"
      :loadComments="loadComments"
      :comments="comments[post.postId]"
      :deleteComment="deleteComment"
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
  beforeCreate() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token == null && userId == null) {
      this.$router.push({ name: "LogIn" });
    }
  },
  data() {
    return {
      token : localStorage.getItem("token"),
      userId : localStorage.getItem("userId"),
      user: [{
        pseudo: ref(""),
        imageUrl: ref(""),
      }],
      post: [{
        title: ref(""),
        content: ref(""),
        imageUrl: ref(""),
      }],
      comment: [{
        content: ref("")
      }],
    };
  },
  getItem() {
    this.token = localStorage.getItem("token");
    this.userId = localStorage.getItem("userId");

    //get the user
    fetch(`http://localhost:3000/api/users/${this.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((res) => {
        if (res.status == 401) {
          this.$router.push({ name: "LogIn" });
          return;
        }
        return res.json();
      })
      .then((res) => {
        this.posts = res;
      });
  },
  methods: {
    //button scroll top
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
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
