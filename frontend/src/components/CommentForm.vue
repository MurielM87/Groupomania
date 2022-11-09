<template>
  <div class="btn_publish_comment">
    <textarea
      type="text"
      class="comment_input"
      v-model="content"
      placeholder="laissez un commentaire"
      rows="3"
      required
    ></textarea>
    <button type="submit" @click.prevent="newComment(post.id)">
      <span>Publier </span><i class="far fa-edit"></i>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CommentForm",
  emit: ["input"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      content: ref(""),
    };
  },
  props: ["post"],

  methods: {
    ...mapActions(["addComment"]),

    newComment () {
      if (this.content === "") {
        return;
      }
      
      console.log("content", this.content)
      console.log("postId", this.post.id)
      this.$store.dispatch("addComment", {
        postId : this.post.id,
        content: this.content
      })
    }
  /*  addComment(postId) {
      if (this.content === "") {
        return;
      } else {
        fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            content: this.content,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.redirect) {
              this.$router.push({ name: "LogIn" });
            }
            console.log("CardForm||data", data);
          })
          .catch((err) => console.error(err));
        this.content = "";
      }
    },*/
  },

  computed: mapGetters(["comments"]),

  mounted() {
    this.getAllPosts;
  }, 

};
</script>