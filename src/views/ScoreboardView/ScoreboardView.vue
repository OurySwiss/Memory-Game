<template>
  <div class="scoreboard-view">
    <div class="scoreboard-container">
      <div class="scoreboard-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Tries</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="score in getSortedScores" :key="score.rank">
              <td class="rank">{{ score.rank }}.</td>
              <td class="user">{{ score.userName }}</td>
              <td class="points">{{ score.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script src="./ScoreboardView"></script>
<style src="./ScoreboardView.css"></style>
