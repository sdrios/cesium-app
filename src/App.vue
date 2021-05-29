// src/App.vue

<template>
  <div class="container">
    <!-- <h1>{{ message }}</h1> -->
    <!-- <Navigation /> -->
    <Map />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    // Navigation,
    Map
  },
  //   data() {
  //     return {
  //       message: 'Using Parcel js App',
  //     };
  //   },
};
</script>

<style>
/* .container {
    width: 600px;
    margin: 50px auto;
    text-align: center;
  } */
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3d5a80;
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>