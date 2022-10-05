<template>
  <!-- add like to the post-->
  <div class="post_like">
    <div class="like_thumbs">
      <div class="tooltip">
        <i class="far fa-thumbs-up" @click.prevent="addLike(post.id)">
          <div v-if="post.Likes.length">{{ post.Likes.length }}</div> </i
        ><span class="tooltiptext">J'aime</span>
      </div>
      <div class="tooltip">
        <i class="far fa-thumbs-down" @click.prevent="addDislike(post.id)">
          <div v-if="post.Dislikes.length">{{ post.Dislikes.length }}</div> </i
        ><span class="tooltiptext">Je n'aime pas</span>
      </div>
      <div class="tooltip">
        <i class="far fa-grin-tears" @click.prevent="addFunny(post.id)">
          <div v-if="post.Funnies.length">{{ post.Funnies.length }}</div> </i
        ><span class="tooltiptext">Marrant</span>
      </div>
      <div class="tooltip">
        <i class="far fa-lightbulb" @click.prevent="addInterest(post.id)">
          <div v-if="post.Interests.length">
            {{ post.Interests.length }}
          </div> </i
        ><span class="tooltiptext">Intéressant</span>
      </div>
      <div class="tooltip">
        <i class="far fa-grin-hearts" @click.prevent="addLove(post.id)">
          <div v-if="post.Loves.length">{{ post.Loves.length }}</div> </i
        ><span class="tooltiptext">J'adore</span>
      </div>
      <div class="tooltip">
        <i
          class="fas fa-hand-holding-heart"
          @click.prevent="addSupport(post.id)"
        >
          <div v-if="post.Supports.length">{{ post.Supports.length }}</div> </i
        ><span class="tooltiptext">Soutien</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PostLike",
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      like: ref(0),
      dislike: ref(0),
      love: ref(0),
      funny: ref(0),
      interest: ref(0),
      support: ref(0),
    };
  },
  props: ["post", "likes", "dislikes", "loves", "funnies", "interests", "supports"],

  methods: {
    //add a like
    addLike(postId) {
      const userId = localStorage.getItem("userId");
      console.log("PostCard||addLike||postId", postId);
      console.log("PostCard||addLike||userId", userId);
      fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          this.like = res.data;
          this.$router.go(); //refresh page
        })
        .catch((err) => console.error(err));
    },

    //add a dislike
    addDislike(postId) {
      const userId = localStorage.getItem("userId");
      console.log("PostCard||addDislike||postId", postId);
      console.log("PostCard||addDislike||userId", userId);
      fetch(`http://localhost:3000/api/posts/${postId}/dislike`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          this.dislike = res.data;
          this.$router.go(); //refresh page
        })
        .catch((err) => console.error(err));
    },

    //add a funny
    addFunny(postId) {
      const userId = localStorage.getItem("userId");
      console.log("PostCard||addFunny||postId", postId);
      console.log("PostCard||addFunny||userId", userId);
      fetch(`http://localhost:3000/api/posts/${postId}/funny`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          this.funny = res.data;
          this.$router.go(); //refresh page
        })
        .catch((err) => console.error(err));
    },

    //add a love
    addLove(postId) {
      const userId = localStorage.getItem("userId");
      console.log("PostCard||addLove||postId", postId);
      console.log("PostCard||addLove||userId", userId);
      fetch(`http://localhost:3000/api/posts/${postId}/love`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          this.love = res.data;
          this.$router.go(); //refresh page
        })
        .catch((err) => console.error(err));
    },
    //add an interest
    addInterest(postId) {
      const userId = localStorage.getItem("userId");
      console.log("PostCard||addInterest||postId", postId);
      console.log("PostCard||addInterest||userId", userId);
      fetch(`http://localhost:3000/api/posts/${postId}/interest`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          this.interest = res.data;
          this.$router.go(); //refresh page
        })
        .catch((err) => console.error(err));
    },
    //add a support
    addSupport(postId) {
      const userId = localStorage.getItem("userId");
      console.log("PostCard||addSupport||postId", postId);
      console.log("PostCard||addSupport||userId", userId);
      fetch(`http://localhost:3000/api/posts/${postId}/support`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          this.support = res.data;
          this.$router.go(); //refresh page
        })
        .catch((err) => console.error(err));
    },
  },
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
  justify-content: flex-end;
  margin-bottom: 20px;
}
.fa-thumbs-up {
  display: flex;
  font-size: 25px;
  color: black;
  &:hover,
  &:active,
  &:link {
    color: green;
  }
}
.fa-thumbs-down {
  display: flex;
  font-size: 25px;
  color: black;
  padding-left: 15px;
  &:hover,
  &:active,
  &:link {
    color: red;
  }
}

.fa-grin-tears {
  display: flex;
  font-size: 25px;
  color: black;
  padding-left: 15px;
  &:hover,
  &:active,
  &:link {
    color: turquoise;
  }
}
.fa-lightbulb {
  display: flex;
  font-size: 25px;
  color: black;
  padding-left: 15px;
  &:hover,
  &:active,
  &:link {
    color: yellow;
  }
}
.fa-grin-hearts {
  display: flex;
  font-size: 25px;
  color: black;
  padding-left: 15px;
  &:hover,
  &:active,
  &:link {
    color: rgb(248, 20, 142);
  }
}
.fa-hand-holding-heart {
  display: flex;
  font-size: 25px;
  color: black;
  padding-left: 15px;
  &:hover,
  &:active,
  &:link {
    color: blue;
  }
}
</style>