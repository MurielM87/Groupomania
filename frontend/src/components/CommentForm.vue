<template>
  <div id="edit_comment">
    <textarea
      type="text"
      class="comment_input"
      v-model="comment"
      placeholder="laissez un commentaire"
      rows="10"
      cols="30"
      required
    ></textarea>
    <button type="submit" @click="submitComment">
      <span>Publier</span> <i class="far fa-edit"></i>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CommentCard",
  props: ["token"],
  data() {
    return {
      comment: ref(""),
    };
  },
  methods: {
    submitComment(postId) {
      fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then(
          function (res) {
            if (res.status != 201) {
              this.fetchError = res.status;
            } else {
              res.json().then(
                function (data) {
                  this.fetchResponse = data;
                }.bind(this)
              );
            }
          }.bind(this)
        )
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style>
#edit_comment {
  border: 1px solid #4e5166;
}
</style>