<template>
  <h1>NEX-18 Memory-Game</h1>
  <section class="game-board">
    <card v-for="(card, index) in cardList" :key="`card-${index}`" :value="card.value" :visible="card.visible"
      :position="index" @select-card="flipCard" />
  </section>
  <h2>{{ userSelection }}</h2>
</template>
<script>
import Card from "./components/Card.vue";
import { ref } from "vue";
export default {
  name: "App",
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);
    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i,
      });
    }
    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;
      if (userSelection.value[0]) {
        userSelection.value[1] = payload;
      } else {
        userSelection.value[0] = payload;
      }
    };
    return {
      cardList,
      flipCard,
      userSelection,
    };
  },
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
