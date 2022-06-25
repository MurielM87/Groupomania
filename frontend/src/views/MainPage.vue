<template>
  <h2>PUBLICATIONS</h2>

  <PostForm />

  <div id="separate_barre"></div>
  <li id="post_card" v-for="post in posts" :key="post.id">    
        <PostCard />      
  </li>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";
//import {ref} from "vue";
const token = localStorage.getItem("token");

export default {
  name: "MainPage",
  components: {
    PostCard,
    PostForm,
  },
  /*async setup() {
    const error = ref(null);
    const posts = ref(null);

    try {
       const postsResponse = await fetch('http://localhost:3000/post')
    posts.value = await postsResponse.json()
    }catch(e){
      error.value = e
    }   

    return {posts, error}
  }*/



  beforeCreate() {    
    if (token == null) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      post: [],
    };
  },
  created() {
    fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.post = res.data;
      })
      .catch((err) => console.log("err:", err));
  },
};
</script>

<style lang="scss">
#post_card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#separate_barre {
  width: 60%;
  border: 2px solid #fd2d01;
  margin: auto;
}
</style>
