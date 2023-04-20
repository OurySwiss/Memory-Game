import Card from '@/components/CardComponent/CardComponent.vue';
import axios from 'axios';

export default {
  components: {
    Card,
  },
  data() {
    return {
      cardList: [],
      userSelection: [],
    };
  },
  computed: {
    status() {
      if (this.remainingPairs === 0) {
        return 'Spieler gewinnt';
      } else {
        return `Verbleibende Paare: ${this.remainingPairs}`;
      }
    },
    remainingPairs() {
      const remainingCards = this.cardList.filter(
        (card) => !card.matched
      ).length;
      return remainingCards / 2;
    },
  },
  methods: {
    shuffleCards(cards) {
      const targetCards = cards || this.cardList;
      const shuffledCards = [...targetCards];
      shuffledCards.sort(() => {
        return 0.5 - Math.random();
      });
      if (cards) {
        return shuffledCards;
      } else {
        this.cardList = shuffledCards;
      }
    },

    restartGame() {
      this.shuffleCards();
      const updatedCards = this.cardList.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        };
      });
      this.cardList = updatedCards;
    },
    flipCard(payload) {
      this.cardList[payload.position].visible = true;
      if (this.userSelection[0]) {
        if (
          this.userSelection[0].position === payload.position &&
          this.userSelection[0].faceValue === payload.faceValue
        ) {
          return;
        }
        this.userSelection[1] = payload;
      } else {
        this.userSelection[0] = payload;
      }
    },
    async loadCards() {
      const { data: responseFromApi } = await axios.get(
        'https://memory-api.dev-scapp.swisscom.com/cards'
      );

      const shuffledResponse = this.shuffleCards(responseFromApi);
      const eightCards = shuffledResponse.slice(0, 8);
      const allCards = JSON.parse(
        JSON.stringify([...eightCards, ...eightCards])
      );

      this.cardList = allCards.map((card, index) => ({
        value: {
          url: card.url,
          title: card.title,
        },
        visible: false,
        position: index,
        matched: false,
      }));

      this.shuffleCards();
    },
  },
  watch: {
    userSelection: {
      handler(newUserSelection) {
        if (newUserSelection.length === 2) {
          const cardOne = newUserSelection[0];
          const cardTwo = newUserSelection[1];
          if (cardOne.faceValue === cardTwo.faceValue) {
            this.cardList[cardOne.position].matched = true;
            this.cardList[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              this.cardList[cardOne.position].visible = false;
              this.cardList[cardTwo.position].visible = false;
            }, 2000);
          }
          this.userSelection = [];
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.loadCards();
  },
};
