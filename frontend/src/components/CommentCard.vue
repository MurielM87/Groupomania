<template>
  <div class="post_comments">
    <!--add a comment to the post -->
    <h3>Commentaires <i class="fas fa-comments" /></h3>

    <!--get all comments -->
    <p class="comment_title">
      {{ post.Comments.length }} commentaire{{ post.Comments.length > 1 ? "s" : ""
      }} publié{{ post.Comments.length > 1 ? "s" : "" }}
    </p>
    <div
      v-for="comment in post.Comments"
      :key="comment.id"
      class="comments_card"
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
          >
          <img
            v-else
            :src="require('../assets/avatar.png')"
            alt="avatar par default"
          >
          <span class="comment_author_pseudo">
            {{ comment.User.pseudo }}
          </span>
        </div>
      </router-link>

      <div class="comment_content">
        <p class="comment_text">
          {{ comment.content }}
        </p>
        <br>
        <!--add the datetime -->
        <div class="post_date">
          <p>publié le {{ dateComment(comment.createdAt) }}</p>
        </div>
      </div>

      <div>
        <button
          v-if="comment.User.id == userId"
          id="comment-delete"
          class="form_btn"
          title="Supprimer le commentaire"
          @click.prevent="deleteComment(comment.id, post.id)"
        >
          <span>Supprimer </span><i class="far fa-trash-alt" />
        </button>
      </div>
    </div>

    <!--write a comment -->
    <CommentForm :post="post" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CommentForm from "./CommentForm.vue";

export default {
  name: "CommentCard",
  components: { CommentForm },
  props: ["post"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId")
    };
  },
  computed: mapGetters(["posts"]),
  
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
    ...mapActions(["deleteComment"]),
    
  },

};
</script>

<style lang="scss">
.comment_title {
  display: flex;
  justify-content: flex-end;
}
.comments_card {
  width: 100%;
  background-color: #ffd7d7;
  border: 1px solid #4e5166;
  margin-bottom: 10px;
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
    background-color: #ffffff;
    color: #fd2d01;
    border: 1px solid #fd2d01;
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

</style>