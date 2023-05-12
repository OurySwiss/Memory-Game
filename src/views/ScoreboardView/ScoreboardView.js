import axios from 'axios';

export default {
  data: () => {
    return { scoreboard: 'Score', scores: [] };
  },
  async created() {
    this.scores = await this.loadScores();
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
  },
  computed: {
    getSortedScores() {
      const sortedScores = this.scores.sort((a, b) => a.score - b.score);
      let currentRank = 0;
      let previousScore = null;
      return sortedScores.map((score, index) => {
        if (score.score !== previousScore) {
          currentRank = index + 1;
          previousScore = score.score;
        }
        return { ...score, rank: currentRank };
      });
    },
  },
};
