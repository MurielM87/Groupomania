<template>
  <h2>PUBLICATIONS</h2>

  <PostForm />

  <div id="separate_barre"></div>
  <li id="post_card" v-for="post in posts" :key="post">
    <PostCard />
  </li>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";

export default {
  name: "MainPage",
  components: {
    PostCard,
    PostForm,
  },
//  beforeCreate() {
//    const token = localStorage.getItem('token')
//    if(token == null) {
//        this.$router.push('/login')
//    }
//  },
  mounted(){
    fetch('http://localhost:3000/api/posts')
        .then((res) => res.json())
        .then((res) => {
            this.posts = res
            console.log('this.posts', this.posts)
        })
        .catch((err) => console.log('err:', err))
  },
  data(){
    return {
        posts: []
    }
  }
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
