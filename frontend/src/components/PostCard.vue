<template>
  <div id="card">
    <li v-for="post in publishPost" :key="post.id">
      <button @click="deletePost(post)">
        Supprimer<i class="fas fa-trash-alt"></i>
      </button>
      <button @click="editPost(post)">
        Modifier<i class="fas fa-pen"></i>
      </button>
      <span v-if="postToEdit !== null && postToEdit.id === post.id">
        <input
          type="text"
          v-model="postToEdit.post"
          @keypress.enter="save"
        /><button @click="save"><i class="fas fa-save"></i>sauvegarder</button>
      </span>
      <span v-else>
        {{ post.post }}
      </span>

      <div id="separate_barre"></div>

      <div id="like_post">
        <i class="far fa-thumbs-up"></i>
        <i class="far fa-thumbs-down"></i>
      </div>

      <div id="comment_card">
        <div id="comment_author">
          <img src="@/assets/avatar_default.png" alt="" />
          <h4>nom de l'auteur du commentaire</h4>
        </div>
        <textarea
          type="text"
          v-model="publishComment"
          placeholder="commentaires"
          rows="5"
          cols="33"
          required
        >
        </textarea>
        <button
          type="submit"
          @click.prevent="addComment"
          id="btn_save"
          class="btn"
        >
          <i class="fas fa-save"></i><span class="text_desktop">Publier</span>
        </button>
      </div>

      <div v-for="comment in comments" :key="comment">
        <li>
          <button @click="deletePost(comment)">
            Supprimer<i class="fas fa-trash-alt"></i>
          </button>
          <button @click="editComment(comment)">
            Modifier<i class="fas fa-pen"></i>
          </button>
          <span
            v-if="commentToEdit !== null && commentToEdit.id === comment.id"
          >
            <input
              type="text"
              v-model="commentToEdit.comment"
              @keypress.enter="saveComment"
            /><button @click="saveComment">
              <i class="fas fa-save"></i>sauvegarder
            </button>
          </span>
          <span v-else>
            {{ comment.comment }}
          </span>
        </li>
      </div>
    </li>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PostCard",

  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
    }
  },

  emits: ["deletePost", "editPost", "deleteComment", "editComment"],
  props: {
    publishPost: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    let postToEdit = ref(null);

    let deletePost = function (post) {
      emit("deletePost", post);
    };

    let editPost = function (post) {
      postToEdit.value = post;
    };

    let save = function () {
      emit("editPost", postToEdit.value);
      postToEdit.value = null;
    };

    let commentCard = ref[""];
    let publishComment = ref("");

    const addComment = function () {
      console.log("addComment");
      console.log("PostCard, addComment", publishComment.value);

      emit("addComment", publishComment.value);
      publishComment.value = "";
    };

    let commentToEdit = ref(null);
    let deleteComment = function (comment) {
      emit("deleteComment", comment);
    };
    let editComment = function (comment) {
      commentToEdit.value = comment;
    };
    let saveComment = function () {
      emit("editComment", commentToEdit.value);
      commentToEdit.value = null;
    };

    return {
      deletePost,
      editPost,
      postToEdit,
      save,

      commentCard,
      addComment,
      publishComment,

      deleteComment,
      editComment,
      commentToEdit,
      saveComment,
    };
  },
};
</script>

<style lang="scss">
#card {
  background-color: white;
  width: 25rem;
  border-radius: 20px;
  border: 1px solid #fd2f01;
  padding: 20px;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
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