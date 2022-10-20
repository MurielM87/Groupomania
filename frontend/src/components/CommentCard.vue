<template>
  <!--add a comment to the post -->
  <div class="post_comments">
    <h3>Commentaires <i class="fas fa-comments"></i></h3>

    <!--get all comments -->
    <p class="comment_title">
      {{ post.Comments.length }} commentaire{{
        post.Comments.length > 1 ? "s" : ""
      }}
      publié{{ post.Comments.length > 1 ? "s" : "" }}
    </p>
    <div
      class="comments_card"
      v-for="comment in post.Comments"
      :key="comment.id"
      :comments="comments"
      :comment="comment"
    >
      <router-link
        :to="{ name: 'ProfilUser', params: { id: comment.User.id } }"
      >
        <div class="comment_author">
          <img
            v-if="comment.User.imageUrl"
            :src="`http://localhost:3000/images/${comment.User.imageUrl}`"
            alt="avatar"
            crossorigin="anonymous"
          />
          <img
            v-else
            :src="require('../assets/avatar.png')"
            alt="avatar par default"
          />
          <span class="comment_author_pseudo">
            {{ comment.User.pseudo }}
          </span>
        </div>
      </router-link>

      <div class="comment_content">
        <p class="comment_text">
          {{ comment.content }}
        </p>
        <br />
        <!--add the datetime -->
        <div class="post_date">
          <p>publié le {{ dateComment(comment.createdAt) }}</p>
        </div>
      </div>

      <div>
        <button
          v-if="comment.User.id == userId || userId == 1"
          id="comment-delete"
          class="form_btn"
          title="Supprimer le commentaire"
          @click.prevent="deleteComment(comment.id)"
        >
          <span>Supprimer </span><i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>

    <!--write a comment -->
    <CommentForm :post="post" />
  </div>
</template>

<script>
import { ref } from "vue";
import CommentForm from "./CommentForm.vue";

export default {
  name: "CommentCard",
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      comments: ref([]),
    };
  },
  components: { CommentForm },
  props: ["post"],
  methods: {
    //date of the comment
    dateComment(date) {
      const event = new Date(date);
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },

    //delete a comment from a post
    deleteComment(commentId) {
      confirm("Voulez-vous vraiment supprimer ce commentaire ?");
      fetch(`http://localhost:3000/api/posts/comment/${commentId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.redirect) {
            this.$router.push({ name: "LogIn" });
          }
          console.log("commentId", commentId);
          this.comments = this.comments.splice((commentId) => {
            console.log("deleteComment || commentId", commentId);
            return this.comments;
          });
          this.getAllPosts;
          this.$forceUpdate();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.comment_title {
  display: flex;
  justify-content: flex-end;
}
.comments_card {
  width: 80%;
  background-color: #ffd7d7;
  border: 1px solid #4e5166;
  margin-bottom: 10px;
  margin-left: auto;
  border-radius: 10px;
  padding: 10px;
}

.comment_author {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid #4e5166;
  border-radius: 10px;
  &:hover {
    background-color: #f0d1d1;
    color: #fd2d01;
  }
}
.comment_author_pseudo {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.comment_author img {
  width: 50px;
  padding: 5px;
  border-radius: 50%;
  margin: 0;
}
textarea {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
.btn_publish_comment {
  margin-bottom: 10px;
}
</style>