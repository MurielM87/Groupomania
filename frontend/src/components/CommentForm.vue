<template>
  <div class="btn_publish_comment">
    <textarea
      type="text"
      class="comment_input"
      v-model="content"
      placeholder="laissez un commentaire"
      rows="2"
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
      console.log("content", this.content)
      console.log("postId", this.post.id)
      this.$store.dispatch("addComment", {
        postId : this.post.id,
        content: this.content
      })
    }
  },

  computed: mapGetters(["comments"]),

  mounted() {
    this.getAllPosts;
  }, 

};
</script>