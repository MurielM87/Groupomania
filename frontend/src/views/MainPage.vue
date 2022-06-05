<template>
    <h1>Publications</h1>
    <main>
        <div class="post">
            <h3>titre post</h3>
            <div v-if="user">{{user.pseudo}}</div>
            <div>contenu</div>
        </div>
    </main>
    <div id="section">
        <aside>
            <h2>Publications récentes</h2>
            <div class="post">
                <h3>titre post</h3>
                <div>contenu</div>
            </div>
        </aside>
        <aside>
            <h2>Publications les plus populaires</h2>
            <div class="post">
                <h3>titre post</h3>
                <div>contenu</div>
            </div>
        </aside>
    </div>
    
</template>

<script>


   export default {
        name: 'MainPage',
        props: ['user']
        
   } 


</script>

<style lang="scss">

</style>
