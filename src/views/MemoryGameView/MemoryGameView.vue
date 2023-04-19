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
<script src="./MemoryGameView"></script>
<style src="./MemoryGameView.css"></style>
