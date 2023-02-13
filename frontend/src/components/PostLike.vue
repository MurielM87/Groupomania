<template>
  <!-- add like to the post-->
  <div class="post_like">
    <div class="like_thumbs">
        <div class="tooltip">
        <i class="far fa-thumbs-up"  :class="{active : activeLike}" @click.prevent="addLike(post.id)">
          <div v-if="post.Likes.length">{{ post.Likes.length }}</div> 
        </i><span class="tooltiptext">J'aime</span>
      </div>
      
      <div class="tooltip">
        <i class="far fa-thumbs-down" @click.prevent="addDislike(post.id)">
          <div v-if="post.Dislikes.length">{{ post.Dislikes.length }}</div> 
        </i><span class="tooltiptext">Je n'aime pas</span>
      </div>      
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "PostLike",
  emit: ["input"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      like: ref(0),
      dislike: ref(0),
      postLike: this.post,
      activeLike: false,
    };
  },
  props: ["post"],

 

  methods: {
    //add a like
    ...mapActions(["addLike", "addDislike"]),
  },

  computed: mapGetters(["likes", "dislikes"])
};
</script>

<style lang="scss">
#like_post {
  text-align: right;
  padding: 10px;
  margin-right: 25px;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  //Position the tooltip
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.like_thumbs {
  display: flex;
}
.fa-thumbs-up,
.fa-thumbs-down {
  display: flex;
  font-size: 25px;
  color: black;
  padding-left: 15px;
}
.active {
  color: green;
}

</style>