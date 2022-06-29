<template>
  <div id="card">
    <li v-for="post in publishPost" :key="post.id">
      <button @click="deletePost(post)">Supprimer<i class="fas fa-trash-alt"
        ></i></button>
      <button @click="editPost(post)">Modifier<i class="fas fa-pencil-alt"></i></button>
      <span v-if="postToEdit !== null && postToEdit.id === post.id">
        <input
          type="text"
          v-model="postToEdit.post"
          @keypress.enter="save"
        /><button @click="save"><i class="fas fa-save"
        ></i>sauvegarder</button>
      </span>
      <span v-else>
        {{ post.post }}
      </span>
    </li>

    <div id="separate_barre"></div>

    <div id="like_post">
      <i class="far fa-thumbs-up"></i>
      <i class="far fa-thumbs-down"></i>
    </div>
    <div v-for="comment in comments" :key="comment">
      <CommentPost />
    </div>
    <div id="comment_card">
      <div id="comment_author">
        <img src="@/assets/avatar_default.png" alt="" />
        <h4>nom de l'auteur du commentaire</h4>
      </div>
      <textarea type="text" placeholder="commentaire" required> </textarea>
      <button
        type="submit"
        @click.prevent="publishCard"
        id="btn_save"
        class="btn"
      >
        <i class="fas fa-save"></i><span class="text_desktop">Publier</span>
      </button>
      <button
        type="submit"
        @click.prevent="deleteCard"
        id="bnt_delete"
        class="btn"
      >
        <i class="fas fa-trash-alt"></i
        ><span class="text_desktop">Supprimer</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
//import CommentPost from "./CommentPost.vue";

export default {
  name: "PostCard",
  emits: ["deletePost", "editPost"],
  props: {
    publishPost: {
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

    return {
      deletePost,
      editPost,
      postToEdit,
      save,
    };
  },

  /*
  components: {
    CommentPost,
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
    }
  },
  method: {
    publishCard() {
      console.log("publishCard");
    },
  },*/
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
#comment_author img {
  width: 40px;
  padding: 10px;
}

</style>