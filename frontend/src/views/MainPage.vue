<template>
  <section class="posts">
    <h1>Posts</h1>
    <PostForm :createPost="createPost" />

    <div id="separate_barre"></div>

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :deletePost="deletePost"
      :addLike="addLike"
      :addComment="addComment"
      :loadComments="loadComments"
      :commentaires="comments[post.id]"
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
  data() {
    return {
      posts: [],
      comments: {},
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/posts/", {
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
      fetch(`http://localhost:3000/api/posts/add`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.token}`,
        },
      }).then((res) => {
        const post = res.data;
        post["likes"] = 0;
        this.posts = [post].concat(this.posts);
      });
    },

    //delete a post
    deletePost(postId) {
      fetch(`http://localhost:3000/api/posts/:id`, {
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
      fetch(`http://localhost:3000/api/posts/:id/comment`, {
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
      fetch(`http://localhost:3000/api/posts/comments/${postId}`, {
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
      });
    },

    //delete a comment from a post
    deleteComment(postId, CommentId) {
      fetch(`http://localhost:3000/api/posts/comment/:id`, {
        method: "DELETE",
        data: {postId, CommentId},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        }
      })
      .then(() => this.loadComments(postId))
    },

    //add a like
    addLike(postId) {
      fetch(`http://localhost:3000/api/posts/:id/like`, {
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
</style>
