<template>
  <h1 class="title">Memory-Game</h1>
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
  <h2 class="status">{{ status }}</h2>
  <button class="restart-button" @click="restartGame">Neu starten</button>
</template>
<script>
import _ from "lodash";
import axios from "axios";
import Card from "./components/CardComponent.vue";
import { computed, ref, watch, onMounted } from "vue";

export default {
  name: "App",
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);

    const methods = {
      shuffleCards() {
        cardList.value = _.shuffle(cardList.value);
      },
      restartGame() {
        methods.shuffleCards();
        cardList.value = cardList.value.map((card, index) => {
          return {
            ...card,
            matched: false,
            position: index,
            visible: false,
          };
        });
      },
      flipCard(payload) {
        cardList.value[payload.position].visible = true;
        if (userSelection.value[0]) {
          if (
            userSelection.value[0].position === payload.position &&
            userSelection.value[0].faceValue === payload.faceValue
          ) {
            return;
          }
          userSelection.value[1] = payload;
        } else {
          userSelection.value[0] = payload;
        }
      },
      generateImageUrl(id, title) {
        return `https://memory-api.dev-scapp.swisscom.com/cards/${id}/${title}.jpg`;
      },
      async loadCards() {
        const response = await axios.get(
          "https://memory-api.dev-scapp.swisscom.com/cards"
        );
        const responseFromApi = response.data;
        const eightCards = responseFromApi.slice(0, 8);
        const allCards = JSON.parse(
          JSON.stringify([...eightCards, ...eightCards])
        );

        allCards.forEach((card, index) => {
          cardList.value.push({
            value: {
              url: methods.generateImageUrl(card.id, card.title),
              title: card.title,
            },
            visible: false,
            position: index,
            matched: false,
          });
        });

        methods.shuffleCards();
      },
    };

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return "Spieler gewinnt";
      } else {
        return `Verbleibende Paare: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(
        (card) => card.matched === false
      ).length;
      return remainingCards / 2;
    });

    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];
          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 2000);
          }
          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    onMounted(() => {
      methods.loadCards();
    });

    return {
      cardList,
      flipCard: methods.flipCard,
      userSelection,
      status,
      restartGame: methods.restartGame,
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
* {
  background-color: black;
  background-size: cover;
}
.status {
  color: white;
}
.title {
  color: white;
}
.restart-button {
  background-color: blue;
  color: white;
  padding: 1rem 0.6rem;
  border: 5px solid #ccc;
  border-radius: 10px;
}
</style>
