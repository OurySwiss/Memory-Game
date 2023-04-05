<template>
  <div>
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
  </div>
</template>
<script>
import Card from '@/components/CardComponent.vue';
import axios from 'axios';
import { computed, watch, onMounted, reactive, readonly } from 'vue';

export default {
  components: {
    Card,
  },
  props: {},
  data() {
    return {
      // cardList: [],
      // userSelection: [],
    };
  },
  beforeCreate() {
    // https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
    console.log('beforeCreate');
  },
  created() {
    // Before HTML and CSS loads
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    // After HTML and CSS loads
    console.log('mounted');
  },
  methods: {},
  computed: {},
  watch: {},
  setup() {
    console.log('setup');
    const cardList = reactive([]);
    const userSelection = reactive([]);

    const methods = {
      shuffleCards() {
        const shuffledCards = cardList.sort(() => {
          return 0.5 - Math.random();
        });
        cardList.length = 0;
        cardList.push(...shuffledCards);
      },
      restartGame() {
        methods.shuffleCards();
        const updatedCards = cardList.map((card, index) => {
          return {
            ...card,
            matched: false,
            position: index,
            visible: false,
          };
        });
        cardList.length = 0;
        cardList.push(...updatedCards);
      },
      flipCard(payload) {
        cardList[payload.position].visible = true;
        if (userSelection[0]) {
          if (
            userSelection[0].position === payload.position &&
            userSelection[0].faceValue === payload.faceValue
          ) {
            return;
          }
          userSelection[1] = payload;
        } else {
          userSelection[0] = payload;
        }
      },
      async loadCards() {
        const response = await axios.get(
          'https://memory-api.dev-scapp.swisscom.com/cards'
        );
        const responseFromApi = response.data;
        const eightCards = responseFromApi.slice(0, 8);
        const allCards = JSON.parse(
          JSON.stringify([...eightCards, ...eightCards])
        );

        allCards.forEach((card, index) => {
          cardList.push({
            value: {
              url: card.url,
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
        return 'Spieler gewinnt';
      } else {
        return `Verbleibende Paare: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(() => {
      const remainingCards = cardList.filter(
        (card) => card.matched === false
      ).length;
      return remainingCards / 2;
    });

    watch(
      () => userSelection.slice(),
      (newUserSelection) => {
        if (newUserSelection.length === 2) {
          const cardOne = newUserSelection[0];
          const cardTwo = newUserSelection[1];
          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList[cardOne.position].matched = true;
            cardList[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              cardList[cardOne.position].visible = false;
              cardList[cardTwo.position].visible = false;
            }, 2000);
          }
          userSelection.length = 0;
        }
      },
      { deep: true }
    );

    onMounted(() => {
      methods.loadCards();
    });

    return {
      cardList: readonly(cardList),
      flipCard: methods.flipCard,
      userSelection: readonly(userSelection),
      status,
      restartGame: methods.restartGame,
    };
  },
};
</script>
<style>
.restart-button {
  background-color: blue;
  color: white;
  padding: 0.7rem 0.6rem;
  border: 5px solid #ccc;
  border-radius: 10px;
}
</style>
