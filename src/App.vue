<template>
  <div class="app">
    <h1 class="title">Memory-Game</h1>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* {
  background-color: black;
  background-size: cover;
}
.status {
  color: white;
}
.title {
  color: white;
}*/
</style>
