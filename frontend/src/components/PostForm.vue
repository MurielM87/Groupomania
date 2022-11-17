<template>
  <!--to write a new message -->
  <section
    id="card"
    class="card_writing"
  >
    <h2><i class="fas fa-feather-alt" /> écrire un nouveau message</h2>
    <div class="post_form">
      <input
        v-model="title"
        type="text"
        class="post_title"
        placeholder="titre du message"
        required
      >
      <textarea
        v-model="content"
        type="text"
        placeholder="message"
        rows="3"
        required
      />
      <!--add an image -->
      <div class="post_img">
        <input
          id="addContent"
          ref="fileInput"
          type="file"
          name="imageUrl"
          accept=".jpeg, .jpg, .png, .webp, .gif"
          @change="uploadImg"
        >
      </div>
      <br>

      <!-- button to publish -->
      <button
        class="btn post-btn"
        title="valider la publication"
        @click.prevent="newPost"
      >
        <i class="far fa-edit" />Publier
      </button>
    </div>
  </section>
</template>
    
<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PostForm",
  emit: ["input"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      title: ref(""),
      content: ref(""),
      imageUrl: ref(""),
    };
  },

  computed: mapGetters(["posts"]),

  created() {
    this.getAllPosts;
  },

  methods: {
    ...mapActions(["addPost"]),

    selectImage() {
      this.$ref.fileInput.click();
    },
    //upload image
    uploadImg(e) {
      this.imageUrl = e.target.files[0];
      console.log("image-target", this.imageUrl);
    },

    newPost() {
      if (this.title === "" || this.content === "") return;

      console.log("title", this.title);
      console.log("content", this.content);
      console.log("imageUrl", this.imageUrl);
      this.$store.dispatch("addPost", {
        title: this.title,
        content: this.content,
        imageUrl: this.imageUrl,
        userId: this.userId,
      });

      (this.title = ""), (this.content = ""), (this.imageUrl = "");
    }
  },
};
</script>

<style lang="scss">
#card {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #fd2d01;
  padding: 10px 10px 0px 10px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 90%;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
}

h2 {
  margin-bottom: 10px;
}

.card_writing {
  box-shadow: 5px 5px 7px #ffd7d7;
}

#label_file_input {
  text-align: right;
}

#addContent {
  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
}

.post_title {
  width: 100%;
}
.btn {
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  &:focus {
    background-color: #b4b6be;
  }
  @media screen and (max-width: 992px) {
    font-size: 20px;
  }
}
.fa-save,
.fa-edit,
.fa-trash-alt,
.fa-folder-open,
.fa-pen,
.fa-envelope,
.fa-eraser,
.fa-times-circle {
  font-size: 20px;
  margin: 2px;
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(209, 166, 14, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(236, 147, 14, 0.8), rgba(0, 0, 255, 0) 70.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>