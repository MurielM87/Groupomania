<template>
    <h1>Publications</h1>
    
    <div>
        <PostCard />
    </div>
</template>

<script>
import PostCard from "../components/PostCard.vue";

   export default {
    name: "MainPage",
    props: ["user"],
    components: { PostCard }
} 


</script>

<style>

</style>
