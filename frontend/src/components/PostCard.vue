<template>
  <article id="card">
    <!--informations from the author of the post-->
    <router-link :to="{ name: 'ProfilUser' }">
      <div id="post_author">
        <div id="author_img">
          <img
            v-if="post.image"
            :src="`http://localhost:3000/api/users/${this.imageUrl}`"
            title="Avatar de l'auteur"
            class="author_avatar"
          />
          <img
            v-else
            src="../assets/avatar.png"
            title="Avatar de l'auteur"
            class="author_avatar"
          />
        </div>
        <div class="author_name">
          <h4>Pseudo : {{ user.pseudo }}</h4>
        </div>
      </div>
    </router-link>
    <!--content from the writing post -->
    <div class="post_content">
      <div class="post_description">
        <h3>titre : {{ post.title }}</h3>
        <p>contenu : {{ post.content }}</p>
        <p v-if="post.image">image : {{ post.imageUrl }}</p>
      </div>
      <!--add the datetime -->
      <div class="post_date">
        <p>publié le {{ datePost(post.createdAt) }} -</p>
        <p>modifié le {{ datePost(post.updatedAt) }}</p>
      </div>
    </div>

    <!--add the buttons 'modify' and 'delete' to the published post-->
    <div class="post_btn">
      <button
        id="post_modify"
        title="modifier le message"
        @click="updatePost(postId)"
      >
        <i class="far fa-edit"></i>
        <span class="btn_modify">Modifier</span>
      </button>
      <button
        id="post_delete"
        title="supprimer le message"
        @click="deletePost(postId)"
      >
        <i class="far fa-trash-alt"></i>
        <span>Supprimer</span>
      </button>
    </div>

    <div id="separate_barre"></div>

    <!-- add like to the post-->
    <div @click="addLike(postId)" class="post_like">
      <i class="far fa-thumbs-up"></i>
      <i class="far fa-thumbs-down"></i>
      <p>post.likes : {{ post.likes }}</p>
    </div>

    <!--add a comment to the post -->
    <div class="post_comments">
      <h3><i class="far fa-comment-alt"></i> Commentaires</h3>

      <!--write a comment -->
      <CommentCard />

      <!--get all comments -->
      <div class="comments_card" v-for="comment in comments" :key="comment.id">
        <router-link :to="{ name: 'ProfilUser' }">
          <div class="comment_author">
            <img
              v-if="comment.image"
              :src="`http://localhost:3000/api/users/${userId.imageUrl}`"
            />
            <img v-else src="../assets/avatar.png" alt="avatar de l'auteur" />
            <span class="comment_author_pseudo">
              {{ user.pseudo }}
            </span>
          </div>
        </router-link>

        <div class="comment_content">
          <p class="comment_text">
            {{ comment.content }}
          </p>
          <!--add the datetime -->
          <div class="post_date">
            <p>publié le {{ dateComment(comment.createdAt) }}</p>
          </div>
        </div>

        <button
          id="comment-delete"
          title="Supprimer le commentaire"
          @click="deleteComment(postId, commentId)"
        >
          <span>Supprimer</span><i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import CommentCard from "./CommentCard.vue";

export default {
  name: "PostCard",
  component: {
    CommentCard,
  },
  data() {
    return {
      user: {
        pseudo: "",
        imageUrl: "",
      },
      post: {
        title: "",
        content: "",
      },
      comment: {
        content: "",
      },
    };
  },
  methods: {
    //date of the post
    datePost(date) {
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
    publishPost() {},
    
    updatePost(postId) {    
      console.log("post ${postId} updated", postId);
    },
    deletePost(postId) {
      console.log("deletePost", postId);
      fetch(`http://localhost:3000/api/posts/${this.postId}`, {
        method: "DELETE",
        data: { postId },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
      }).then(() => {
        this.posts = this.posts.filter((post) => {
          console.log("deletePost || postId", postId)
          return post.id != postId;
        });
      });
      console.log("post ${postId} deleted", postId);
    },

    addLike(postId) {
      console.log("addLike || postId", postId);
    },
    deleteComment(postId, commentId) {
      console.log("deleteComment, postId", postId);
      console.log("deleteComment, commentId", commentId);
    },

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

    getAllComments() {},
  },
  components: { CommentCard },
};
</script>

<style lang="scss">
#post_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
}

.author_avatar {
  width: 50px;
  padding: 10px;
}
h4 {
  margin: 20px;
}

#card h3,
#card p {
  margin: 0;
  padding-bottom: 10px;
  padding-left: 10px;
}

#card p {
  text-align: justify;
}

.post_date {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
}

#comment_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
#like_post {
  text-align: right;
  padding: 10px;
  margin-right: 25px;
}
.fa-thumbs-up {
  color: black;
  &:focus {
    color: green;
  }
}
.fa-thumbs-down {
  color: black;
  padding-left: 15px;
  &:focus {
    color: red;
  }
}
#comment_card {
  background-color: #ffd7d7;
  border: 1px solid #fd2d01;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 10px;
}
#comment_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#comment_author img {
  width: 40px;
  padding: 10px;
}
textarea {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>