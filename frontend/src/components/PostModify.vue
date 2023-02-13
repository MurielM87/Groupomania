<template>
  <div
    v-if="revele"
    class="modal_background"
  >
    <div class="post_form">
      <h2>Modifier votre message</h2>
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
      <img
        v-if="imageUrl"
        :src="`http://localhost:3000/images/${imageUrl}`"
        crossorigin="anonymous"
      >
      <img
        v-else
        :src="image"
      >
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

      <button
        class="form_btn"
        title="enregistrer les modifications"
        @click.prevent="updatePost()"
      >
        <i class="fas fa-save" /> Publier les modifications
      </button>
      <button
        class="form_btn"
        @click.prevent="toggleModale"
      >
        <i class="fas fa-times-circle" /> Annuler les modifications
      </button><br>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PostModify",
  emit: ["input"],
  props: ["revele", "toggleModale", "modifyPost"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      title: this.modifyPost.title,
      content: this.modifyPost.content,
      imageUrl: this.modifyPost.imageUrl,
      image: null,
      tempImage: null,
    };
  },

  mounted() {
    fetch(`http://localhost:3000/api/posts/${this.postId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.post = data;
      })
      .catch((err) => console.log(err));
  },

  computed: mapGetters(["posts"]),
  
  methods: {
    selectImage() {
      this.$ref.fileInput.click();
    },
    //upload image
    uploadImg(e) {
      this.imageUrl = null;
      this.tempImage = e.target.files[0];
      this.image = URL.createObjectURL(this.tempImage);
      console.log("image-target", this.image);
      console.log("imageUrl", this.imageUrl);
      console.log("TempImage", this.tempImage);
    },

    ...mapActions(['updatePost']),

    updatePost () { 
      if(this.title === "" || this.content === "") return;
      
      console.log("title", this.title)
      console.log("content", this.content)
      console.log("imageUrl", this.imageUrl)
      this.$store.dispatch("addPost", {
        title: this.title, 
        content: this.content,
        imageUrl: this.imageUrl
      })
    }
  },

  created() {
    this.getAllPosts;
  },
  
};
</script>

<style lang="scss" scoped>
.modal_background {
  background-color: rgb(0, 0, 0, 0.3);
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3 ease;
}

.post_form {
  border: 4px solid #fd2d01;
  background-color: #ffd7d7;
  width: 55%;
  margin: auto;
  margin-top: 70px;
  padding: 30px;
}
</style>