<template>
  <div class="modal_background">
    <h2>Modifier votre message</h2>
    <form @submit.prevent="savePost" class="post_form">
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
        title="enregistrer les modifications"
      >
        <i class="fas fa-save"></i> Enregistrer les modifications
      </button>
      <button class="form_btn">
        <i class="fas fa-times-circle"></i> Annuler les modifications</button
      ><br />
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PostModify",
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
};
</script>

<style>
</style>