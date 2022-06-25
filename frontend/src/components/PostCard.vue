<template>
  <div id="card">
    <div id="post_author">
      <img src="../assets/avatar_default.png" alt="" />
      <div>auteur du post</div>
    </div>
    <h3>titre du post</h3>
    <div>
      <p>contenu du post</p>
    </div>
    <p>publié le</p>
    <div id="like_post">
      <i class="far fa-thumbs-up"></i>
      <i class="far fa-thumbs-down"></i>
    </div>
    <div v-for="comment in comments" :key="comment">
      <CommentPost />
    </div>
    <div id="comment_card">
      <div id="comment_author">
        <img src="../assets/avatar_default.png" alt="" />
        <h4>nom de l'auteur du commentaire</h4>
      </div>
      <textarea type="text" placeholder="commentaire" required> </textarea>
      <button v-on:click.prevent="publishCard" id="btn_save" class="btn">
        <i class="fas fa-save"></i><span class="text_desktop">Publier</span>
      </button>
      <button v-on:click.prevent="deleteCard" id="bnt_delete" class="btn">
        <i class="fas fa-trash-alt"></i
        ><span class="text_desktop">Supprimer</span>
      </button>
    </div>
  </div>
</template>

<script>
import CommentPost from "./CommentPost.vue";
export default {
  name: "PostCard",
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
#like_post {
  text-align: right;
  padding: 10px;
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
</style>