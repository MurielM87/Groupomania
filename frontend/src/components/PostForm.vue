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
        rows="3"
        required
      ></textarea>
      <!--add an image -->
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
  //props: ["token", "userId"],
  data() {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      title: ref(""),
      content: ref(""),
      imageUrl: ref(""),
    };
  },
  
  //get the user by id
  async created() {
    await fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",    
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then((data) => {
        console.log("FormCard||user||data", data);
        this.user = data;
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

    async createPost() {  
      if(this.title === "") {
        return
      } if(this.content === ""){
        return
      }

      const fd = new FormData()
      fd.append("title", this.title)
      fd.append("content", this.content)
      fd.append("imageUrl", this.imageUrl)
      console.log("FormData||fd", fd)

      await fetch(`http://localhost:3000/api/posts/add`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: fd
        })
        .then((data) => {
        console.log("PostForm||data", data);
        this.fd = data;
        })
        .catch((err) => console.log(err));
      this.fd = ""  
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
.fa-times-circle,
.fa-comment-alt {
  font-size: 20px;
  margin: 2px;
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(209, 166, 14, 0.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(236, 147, 14, 0.8), rgba(0,0,255,0) 70.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>