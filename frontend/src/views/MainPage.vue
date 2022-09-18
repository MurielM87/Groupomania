<template>
  <section class="posts">
    <h2>Bonjour {{ user.pseudo }}</h2>
    <PostForm :key="componentKey"/>

    <div class="separate_barre"></div>
    <h2>Nouvelles publications</h2>

    <PostCard 
      v-for="post in posts" 
      :key="post.id"
      :post="post"
      :comment="comment"
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
      user: ref({}),
      posts: ref([]),
      comment: ref({}),
      componentKey: 0,
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
    await fetch(`http://localhost:3000/api/posts`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",    
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("MainPage||posts||data", data);
        this.posts = data;
      })
      .catch((err) => console.log(err));
    }, 

  async mounted() {
    await fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",    
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("MainPage||this.user||data", data);
        this.user = data;
      })
      .catch((err) => console.log(err));
    },

  async updated() {
    await fetch(`http://localhost:3000/api/posts/comments`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",    
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("MainPage||comments||data", data);
        this.comments = data;
      })
      .catch((err) => console.log(err));
    },
 
  methods: {    
    forceRerender() {
      this.componentKey ++;
    },
    
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
img {
  width: 250px;
  margin: auto;
}
.toTop {
  display: flex;
  margin-left: 30px;
}
</style>
