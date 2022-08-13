<template>
  <!--to write a new message -->
  <section id="card" class="card_writing">
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
        <label for="addContent"></label>
        <input
          @input="uploadImg"
          type="file"
          ref="fileInput"
          id="addContent"
          name="imageUrl"
          accept=".jpeg, .jpg, .png, .webp, .gif"
        />
      </div>
      <br />

      <!-- button to publish -->
      <button
        @click.prevent="createPost"
        class="btn post-btn"
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
  emits:["createPost"],
  data() {
    return {
      //userId: localStorage.getItem("userId"),
      postForm: ref([]),
    };
  },
  props: ["token", "userId"],
  methods: {
    selectImage() {
      this.$ref.fileInput.click()
    },
    //upload image
    uploadImg(event) {
      this.imageUrl = event.target.files[0];
      console.log("image-target", this.imageUrl);
    },

    createPost() {
       const postForm = {
        title: this.title,
        content: this.content,
        image: this.imageUrl,
        };        
      console.log("PostForm||postForm", postForm)
        
      if (this.imageUrl === ''){
        fetch(`http://localhost:3000/api/posts/add`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Authorization": `Bearer ${this.token}`,
        },body: postForm,
      })
      .then((res) => {
        this.title = '';
        this.content = '';
        this.$emit("createPost", postForm);
        this.post.push(this.postForm);
        console.log("res", res)
      })
      .catch((err) => console.log("err", err))
      }else{
        let postForm = new FormData();
        const post = JSON.stringify({title: this.title, content: this.content})
        const image = this.file
        postForm.append('post', post)
        postForm.append('image', image)
         if(this.file === 'jpeg' || this.file === 'jpg' || this.file === 'png'){
          fetch(`http://localhost:3000/api/posts/add`, postForm, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                "Authorization": `Bearer ${this.token}`,
        },body: FormData,
        })
        .then((data) => {
          console.log("data", data);
          this.postForm = data;
        //  this.title = '';
        //  this.content = '';
        //  this.file = '';
        //  this.$emit("createPost", postForm)
        })
        .catch((err) => console.log("err", err))
         }
      }
       
      this.postForm = "";
    },
   
  },
}
</script>

<style lang="scss">
#card {
  display: flex;
  flex-direction: column;
  width: 600px;
  background-color: white;
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

h2 {
  margin-bottom: 10px;
}

.card_writing {
  box-shadow: 5px 5px 7px #ffd7d7;
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
    background-color: #b4b6be;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 25px;
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
    linear-gradient(127deg, rgba(225, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(255, 170, 0, 0.8), rgba(0, 0, 255, 0) 70.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>