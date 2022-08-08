<template>
  <!--to write a new message -->
  <section id="card">
    <h2>Nouveau message</h2>
    <div class="post_form">
      <input
        type="text"
        v-model="title"
        class="post_title"
        placeholder="titre du message"
        required
      />
      <textarea
        type="text"
        v-model="content"
        placeholder="message"
        rows="10"
        cols="30"
        required
      ></textarea>
      <!--add an image -->
      <div class="post_img">
        <!--preview image -->
        <div class="preview_img" :style="{'background-image': `url(${previewImage})`}" @click="selectImage"></div>
        <label for="addContent"></label>
        <input
          @input="uploadImg($event)"
          type="file"
          ref="fileInput"
          id="addContent"
          name="imageUrl"
          accept=".jpeg, .jpg, .png, .webp, .gif"
        />
      </div>

      <!-- button to publish -->
      <button
        @click.prevent="addPost()"
        class="post-btn"
        title="valider la publication"
      >
        <i class="far fa-edit"></i>Publier
      </button>
    </div>
  </section>
</template>
    
<script>
import { ref } from "vue";

export default {
  name: "PostForm",
  props: {
    createPost: Function,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      postForm: {
        title: ref(""),
        content: ref(""),
        imageUrl: ref(""),
      },
      previewImage: null,
    };
  },


  methods: {
    selectImage() {
      this.$ref.fileInput.click()
    },
    //upload image
    uploadImg(event) {
      this.imageUrl = event.target.files[0];
      console.log("image-target", this.imageUrl);
    },

    addPost() {
      this.postForm = {
        title: this.title,
        content: this.content,
        image: this.imageUrl,
      };
      console.log("title", this.title);
      console.log("content", this.content);
      console.log("imageUrl", this.imageUrl);

      const fd = new FormData();
      console.log("newFormData", fd);
      fd.append("title", this.title);
      fd.append("content", this.content);
      fd.append("image", this.imageUrl);

      fetch(`http://localhost:3000/api/posts/add`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: fd,
      }).then(
        function (res) {
          if (res.status != 201) {
            this.fetchError = res.status;
            console.log("res", res);
          } else {
            res.json().then(
              function (data) {
                this.fetchResponse = data;
                console.log("data", data);
              }.bind(this)
            );
          }
        }.bind(this)
      );
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
  border: 1px solid #fd2d01;
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

#label_file_input {
  text-align: right;
}

.post_title {
  width: 100%;
}
.btn {
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  &:focus {
    background-color: #fd2d01;
  }
}
.fa-save,
.fa-edit,
.fa-trash-alt,
.fa-folder-open,
.fa-pen {
  font-size: 20px;
  margin: 2px;
}

.preview_img{
  width: 40px;
  height: 40px;
}
</style>