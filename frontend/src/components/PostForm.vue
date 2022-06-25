<template>
  <div id="card">
    <div id="post_author">
      <img src="../assets/avatar_default.png" alt="" />
      <div>auteur du post</div>
    </div>
    <div id="post_form" contenteditable="true">
      <input
        type="text"
        v-model="title"
        placeholder="titre"
        class="post_title"
        required
      />
      <textarea
        type="text"
        v-model="content"
        placeholder="message"
        rows="5"
        cols="33"
        required
      >
      </textarea>
    </div>
    <div>
      <div id="label_file_input">
        <label for="file-input" id="btn_file_input" class="btn"
          ><i class="far fa-folder-open" id="btn_file"></i
          ><span class="text_desktop">Ajouter une image</span></label
        >
        <input type="file" id="file-input" />
        <v-file-input
          @change="uploadImage"
          v-model="file"
          accept="image/png, image/jpeg, image/jpg, image/bmp, image/gif, image/webp"
          label="Ajouter une image"
          hide-details
          prepend-icon="far fa-folder-open"
          outlined
          dense
        >
        </v-file-input>
      </div>

      <button
        @click.prevent="publishPost"
        :disabled="isValid"
        id="btn_save"
        class="btn"
      ><i class="fas fa-save"></i><span class="text_desktop">Publier</span>
      </button>
      <button 
        @click.prevent="deletePost" 
        id="btn_delete" 
        class="btn"
        ><i class="fas fa-trash-alt"></i><span class="text_desktop">Supprimer</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
    }
  },
  method: {
    publishPost() {
      console.log("publishPost");
      if (this.title === "" || this.content === "") {
        console.log("error");
      } else {
        fetch("http://localhost:3000/api/post/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.title,
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
    deletePost() {
      console.log("deletePost");
      fetch("http://localhost:3000/api/post/:id", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
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
    },
  },
};
</script>

<style lang="scss">
#card {
  display: flex;
  flex-direction: column;
  width: 45rem;
  border-radius: 20px;
  border: 1px solid peru;
  padding: 20px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 90%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
}

#post_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#post_author img {
  width: 40px;
  padding: 10px;
}

.post_title {
  width: 100%;
}

#card h3,
#card p {
  margin: 0;
  padding-bottom: 10px;
  padding-left: 10px;
  text-align: left;
}

#post_form {
  display: flex;
  flex-direction: column;
}

#post_form img {
  width: 100%;
  object-fit: cover;
}
#label_file_input {
  text-align: right;
}
.btn {
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
}
.fa-save,
.fa-trash-alt,
.fa-folder-open {
  font-size: 20px;
  margin: 2px;
  &:focus {
    color: #fd2d01;
  }
}
</style>