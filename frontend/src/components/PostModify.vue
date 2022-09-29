<template>
  <div class="modal_background" v-if="revele">    
    <div class="post_form">
      <h2>Modifier votre message</h2>
      <input
        type="text"        
        class="post_title"
        placeholder="titre du message"
        v-model="this.title"
        required
      />
      <textarea
        type="text"
        v-model="this.content"
        placeholder="message"
        rows="3"
        required
      ></textarea>
      <!--add an image -->
      <img v-if="this.imageUrl" 
          :src="`http://localhost:3000/api/images/${imageUrl}`"
          crossorigin="anonymous"/>
      <img v-else :src="image"/>
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
        @click.prevent="updatePost()"
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

export default {
  name: "PostModify",
  emit: ["input"],
  props: ["revele", "toggleModale", "modifyPost", "componentKey"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      title: this.modifyPost.title,
      content: this.modifyPost.content, 
      imageUrl: this.modifyPost.imageUrl,
      image: null,
    };
  },

  created() {
    console.log(this.modifyPost)
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
    //  console.log("PostModify||data", data);
      this.post = data;
    })
    .catch((err) => console.log(err));
  },

  methods: {
    selectImage() {
      this.$ref.fileInput.click()
    },
    //upload image
    uploadImg(e) {
      this.imageUrl = e.target.files[0];
      console.log("image-target", this.imageUrl);
    },
      
    //modify post
    updatePost(postId) {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")

      const post = {
        postId: this.modifyPost.id,
        title: this.title,
        content: this.content,
        imageUrl: this.imageUrl,
      };
      console.log("ModifyPost||post", post);
           
      const fd = new FormData();
      fd.append("imageUrl", post.imageUrl);
      fd.append("title", post.title);
      fd.append("content", post.content);

      if(userId == userId && token == token) {
        console.log(postId)
        fetch(`http://localhost:3000/api/posts/${post.postId}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: fd,
        })
        .then((res) => res.json())
        .then(() => {
          console.log("ModifyPost||post", this.post);
          this.$router.go(`/`);
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
    margin-top: 70px;
    padding: 30px;
  }
</style>