<template>
  <footer>
    <h2>Groupomania</h2>
    <div>Réseau social</div>
    <div><a href="contact@groupomania.com">contact</a></div>
  </footer>
</template>

<script>
export default {
  name: "FooterPage",
};
</script>

<style lang="scss">
footer {
  width: 100%;
  background: #f5f5f5;
  font-size: 20px;
  line-height: 25px;
  padding: 20px;
  text-align: center;
  @media screen and (max-width: 992px) {
    width: 100%;
    padding: 20px 0px;
    margin: auto;
  }
}
</style>