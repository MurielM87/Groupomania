<template>
  <div class="modal_background" v-if="revele">    
    <div class="post_form">
      <h2>Modifier votre message</h2>
      <input
        type="text"
        v-model="post.title"
        class="post_title"
        placeholder="titre du message"
        required
      />
      <textarea
        type="text"
        v-model="post.content"
        placeholder="message"
        rows="3"
        required
      ></textarea>
      <!--add an image -->
      <img v-if="imageUrl" :src="`http://localhost:3000/api/images/${this.post.imageUrl}`"/>
      <div class="post_img">
        <input
          @change="uploadImg"
          type="file"
          ref="fileInput"
          id="addContent"
          name="imageUrl"
          accept=".jpeg, .jpg, .png, .webp, .gif"
        />
      </div>

      <button
        @click.prevent="updatePost"
        class="form_btn"
        title="enregistrer les modifications">
        <i class="fas fa-save"></i> Publier les modifications
      </button>
      <button 
        @click.prevent="toggleModale"
        class="form_btn">
        <i class="fas fa-times-circle"></i> Annuler les modifications
      </button
      ><br />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PostModify",
  emit: ["input"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      post: ref({
        title: "",
        content: "",
        imageUrl: "",
      }),
    };
  },
  props: ["revele", "toggleModale"],

  created() {
    fetch(`http://localhost:3000/api/posts/${this.postId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("PostModify||data", data);
      this.post = data;
    })
    .catch((err) => console.log(err));
  },

  methods: {
    //upload image
    uploadImg(e) {
      this.post.imageUrl = e.target.files[0];
      //preview image
      this.image = URL.createObjectURL(this.post.imageUrl);
      this.$emit("input", this.post.imageUrl); 
    },
      
    //modify post
    updatePost() {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")

      const post = {
        title: this.post.title,
        content: this.post.content,
        imageUrl: this.post.imageUrl,
      };
      console.log("ModifyPost||post", post);
           
      const fd = new FormData();
      fd.append("imageUrl", post.imageUrl);
      fd.append("title", post.title);
      fd.append("content", post.content);

      if(userId == userId && token == token) {
        fetch(`http://localhost:3000/api/posts/${this.postId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: fd,
        })
        .then(() => {
          alert("post modifié");
          console.log("ModifyPost||post", this.post);
          this.$router.push(`/`);
        })
        .catch((error) => {
          console.error(error)
          console.warn("ModifyPost||FormData", fd);
        });
      }
    }
  },
  
};
</script>

<style lang="scss" scoped>
  .modal_background {
    background-color: rgb(0,0,0,0.3);
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
    border: 4px solid #FD2D01;
    background-color: #FFD7D7;
    width: 55%;
    margin: auto;
    margin-top: 90px;
    padding: 30px;
  }
</style>