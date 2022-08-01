<template>
  <section class="posts">
   
    <PostForm :createPost="createPost" />

    <div id="separate_barre"></div>
     <h2>Nouvelles publications</h2>

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :deletePost="deletePost"
      :addLike="addLike"
      :addComment="addComment"
      :loadComments="loadComments"
      :comments="comments[post.id]"
      :deleteComment="deleteComment"
    />

    <!-- Bouton Scroll to Top-->
    <button class="toTop" @click="toTop" title="Retour en haut de page">
      <span class="fa fa-chevron-up"></span>
    </button>
  </section>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostCard from "@/components/PostCard.vue";

export default {
  name: "MainPage",
  components: {
    PostForm,
    PostCard,
  },
  created(){
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token == null && userId == null) {
      this.$router.push({name: 'LogIn'})
    }
  },
  data() {
    return {
      posts: [],
      comments: {},
    };
  },
  getItem() {
    this.token = localStorage.getItem("token");
    this.userId = localStorage.getItem("userId");

    fetch(`http://localhost:3000/api/posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
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

    //create a new post
    createPost(formData) {
      console.log("createPost", formData)
      fetch(`http://localhost:3000/api/posts/add`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        },
         body: JSON.stringify({
            title: this.title,
            content: this.content,
          }),
      }).then((res) => {
        console.log("createPost | formData", formData);
        const post = res.data;
        console.log("createPost | res.data", res.data)
        post["likes"] = 0;
        this.posts = [post].concat(this.posts);
      });
    },

    //delete a post
    deletePost(postId) {
      console.log("deletePost", postId)
      fetch(`http://localhost:3000/api/posts/${this.postId}`, {
        method: "DELETE",
        data: { postId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => {
        this.posts = this.posts.filter((post) => {
          return post.id != postId;
        });
      });
    },

    //add a comment
    addComment(postId, content) {
      console.log("addContent||postId, content", postId, content)
      fetch(`http://localhost:3000/api/posts/${this.postId}/comment`, {
        method: "POST",
        data: { postId, content },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }).then(() => this.loadcomments(postId));
    },

    //get all comments from a post
    loadComments(postId) {
      fetch(`http://localhost:3000/api/posts/comments/${this.postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }).then((res) => {
        this.comments = {
          ...this.comments,
          [postId]: res.data,
        };
        console.log("loadComments||res.data", res.data)
      });
    },

    //delete a comment from a post
    deleteComment(postId, commentId) {
      console.log("deleteComment||postId", postId);
      console.log("deleteComment||commentId", commentId)
      fetch(`http://localhost:3000/api/posts/comment/${this.commentId}`, {
        method: "DELETE",
        data: {postId, commentId},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        }
      })
      .then(() => this.loadComments(postId))
    },

    //add a like
    addLike(postId) {
      console.log("addLike||postId", postId)
      fetch(`http://localhost:3000/api/posts/${this.postId}/like`, {
        method: "POST",
        data: { postId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }).then((res) => {
        for (let post in this.posts) {
          if (this.posts[post].id == postId) {
            if (res.status == 204) {
              this.posts[post].likes -= 1;
            }
            console.log("addLike||posts", post)
            if (res.status == 201) {
              this.posts[post].likes += 1;
            }
          }
        }
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
