<template>
  <div class="app">
    <nav>
      <router-link to="/game">Game</router-link>
      <router-link to="/scoreboard">Scoreboard</router-link>
    </nav>
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
</style>
