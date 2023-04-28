import axios from 'axios';

export default {
  data: () => {
    return { scoreboard: 'Score', scores: [] };
  },
  async created() {
    this.scores = await this.loadScores();
  },
  mounted() {
    // After DOM content is loaded
  },
  methods: {
    async loadScores() {
      try {
        const { data: responseFromApi } = await axios.get(
          'https://memory-api.dev-scapp.swisscom.com/scores'
        );
        return responseFromApi;
      } catch (error) {
        console.error('Error fetching scores:', error);
        return [];
      }
    },
    myMethod(arr) {
      arr.sort();
      arr.reverse();
      return arr;
    },
    getSortedScores() {
      return this.scores.sort((a, b) => a.score - b.score);
    },
  },
};
