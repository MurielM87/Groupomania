<template>
  <div id="comment_card">
    <div>
      <div id="comment_author">
        <img src="../assets/avatar_default.png" alt="" />
        <h4>nom de l'auteur du commentaire</h4>
      </div>
      <textarea
        name="comment"
        v-model="comment"
        id="comment_area"
        rows="5"
        cols="33"
        placeholder="commentaire"
        required
      >
      </textarea>
      <div>publié le</div>
    </div>
    <button
      type="submit"
      @click.prevent="addComment"
      id="btn_save"
      class="btn"
    >
      <i class="fas fa-save"></i><span class="text_desktop">Publier</span>
    </button>
    <button
      type="submit"
      @click.prevent="deleteComment"
      id="btn_delete"
      class="btn"
    >
      <i class="fas fa-trash-alt"></i
      ><span class="text_desktop">Supprimer</span>
    </button>
  </div>
</template>

<script>
import {ref} from 'vue';

export default {

  name: "CommentPost",
  setup(props, ctx) {
    let comment = ref("")

    const addComment = function() {
      console.log("addComment");
      console.log("addComment", comment.value)
    }

    ctx.emit("add", comment.value)

    return {
      addComment,
      comment,
    }
  }

  /*
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
    }
  },
  method: {
    addComment() {
      console.log("addComment");
      if (this.name === "" || this.content === "") {
        console.log("error");
      } else {
        fetch("http://localhost:3000/api/post/:id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            content: this.content,
          }),
        })
          .then((response) => {
            this.$router.push("/home");
            console.log(response);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },*/
};
</script>

<style lang="scss">
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