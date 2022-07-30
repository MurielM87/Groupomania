<template>
  <section id="new_post">
    <form class="post_card" @submit.prevent="addPost($event)">
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
        <div class="post_img">
          <label for="addContent"
            ><i class="far fa-file-image" title="ajouter un fichier"></i
          ></label>
          <input 
            type="file" id="addContent" name="imageUrl" accept="image/*" />
        </div>
        <button class="post-btn" title="valider la publication">Publier</button>
      </div>
    </form>
  </section>
</template>

    
<script>
export default {
  name: "PostForm",
  props: {
    createPost: Function
  },
  data() {
    return {
      postForm: {
        title: "",
        content: "",
        imageUrl: ""
      }
    }
  },
  methods: {
    addPost(event) {
      const title = this.postForm.title;
      const content = this.postForm.content;
      const image = event.target.image.files[0];

      const formData = new FormData();
      formData.append('title', title);
      formData.append ('content', content);
      formData.append ('image', image);
      this.createPost(FormData);

      this.postForm = {
        title: '',
        content: '',
        image: ''
      }
      event.target.image.value=''
    }
  }
}
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
  &:focus {
    background-color: #fd2d01;
  }
}
.fa-save,
.fa-trash-alt,
.fa-folder-open,
.fa-pen {
  font-size: 20px;
  margin: 2px;
}
</style>