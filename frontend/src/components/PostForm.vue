<template>
  <!--to write a new message -->
  <section id="card" class="card_writing">
    <h2><i class="fas fa-feather-alt"></i> écrire un nouveau message</h2>
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
        @click.prevent="newPost"
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
    },

    //  addPost() {
    /*  

      const fd = new FormData()
      fd.append("title", this.title)
      fd.append("content", this.content)
      fd.append("imageUrl", this.imageUrl)
   
      for (const pair of fd.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }*/

    /*  await fetch(`http://localhost:3000/api/posts/add`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: fd
        })
        .then((data) => {
          if(data.redirect) {
           this.$router.push({name: 'LogIn'})
          }
          console.log("PostForm||data", data);
          this.fd = data.post;
        })
        .catch((err) => console.log(err)) */
    //    this.fd = ""

    //  },
  },

  computed: mapGetters(["posts"]),

  created() {
    this.getAllPosts;
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