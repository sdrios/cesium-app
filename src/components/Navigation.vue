<template>
  <div id="nav">
    <h3>Sarah Rios</h3>
    <a
      href="https://github.com/sdrios/vue-cesium-app/tree/master"
      target="_blank"
      rel="noopener"
      ><img class="resImg" alt="Github logo" src="../assets/GitHub.png"
    /></a>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  background-color: #000f08;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5%;
}
.resImg {
  width: 100%;
  height: auto;
}
h3 {
  margin: 0;
}
</style>