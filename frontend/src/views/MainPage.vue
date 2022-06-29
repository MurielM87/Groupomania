<template>
  <h2>PUBLICATIONS</h2>

  <PostForm @add="addPost"/>

  <div id="separate_barre"></div>
  <br />
  <PostCard :publishPost="publishPost" @deletePost="deletePost" @editPost="editPost"/>  
  
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import PostForm from "@/components/PostForm.vue";
import {ref} from "vue";
//const token = localStorage.getItem("token");

export default {
  name: "MainPage",
  components: {
    PostCard,
    PostForm,
  },
  setup(){
    let publishPost = ref([]);
    const addPost = function(data) {
      console.log("data, addPost", data);
      publishPost.value = [...publishPost.value, { post: data, id: Date.now()}];
      console.log("MainPage, publishPost", publishPost.value)
    };

    const editPost = function(post) {
      publishPost.value = publishPost.value.map(p => p.id !== post.id ? p : post)
    };

    const deletePost = function(post) {
      console.log("MainPage, deletePost", post)
      publishPost.value = publishPost.value.filter(p => p.id !== post.id)
    };

    return {
      addPost,
      publishPost,
      editPost,
      deletePost,
    }
  }

  /*
  
  

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
    fetch("http://localhost:3000/api/post/", {
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
  },*/
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

li {
  list-style: none;
}
</style>
