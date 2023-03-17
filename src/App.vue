<template>
  <h1>Memory-Game</h1>
  <section class="game-board">
    <card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="index"
      @select-card="flipCard"
    />
  </section>
  <h2>{{ status }}</h2>
  <p>Verbleibende Paare: {{ remainingPairs }}</p>
</template>
<script>
import Card from "./components/Card.vue";
import { computed, ref, watch } from "vue";
export default {
  name: "App",
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);
    const status = ref("");
    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;
      return remainingCards / 2;
    });
    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: 10,
        visible: false,
        position: i,
        matched: false,
      });
    }
    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];
          if (cardOne.faceValue === cardTwo.faceValue) {
            status.value = "Paar!";
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            status.value = "Kein Paar!";
            cardList.value[cardOne.position].visible = false;
            cardList.value[cardTwo.position].visible = false;
          }
          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );
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
      status,
      remainingPairs,
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
