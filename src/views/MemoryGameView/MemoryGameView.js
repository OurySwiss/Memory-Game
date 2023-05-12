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
      score: 0,
      showModal: false,
      uncovered: 0,
      userName: '',
    };
  },
  computed: {
    status() {
      if (this.remainingPairs === 0) {
        this.showModal = true;
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
          score: 0,
        };
      });
      this.cardList = updatedCards;
    },
    flipCard(payload) {
      const visibleCount = this.cardList.filter(
        (card) => card.visible && !card.matched
      ).length;
      if (visibleCount >= 2) {
        return;
      }
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
    async postScore() {
      const userName = this.$refs.nameInput.value;
      this.userName = userName;
      try {
        const response = await axios.post(
          'https://memory-api.dev-scapp.swisscom.com/scores',
          {
            userName: this.userName,
            score: this.score,
          }
        );
        console.log(response);
        setTimeout(() => {
          this.$router.push('/scoreboard');
        }, 2000);
      } catch (error) {
        console.error(error);
      }
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
            this.score++;
            this.uncovered++;
          } else {
            setTimeout(() => {
              this.cardList[cardOne.position].visible = false;
              this.cardList[cardTwo.position].visible = false;
              this.score++;
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
