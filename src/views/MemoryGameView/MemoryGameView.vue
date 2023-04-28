<template>
  <div>
    <section class="game-board">
      <card
        v-for="(card, index) in cardList"
        :key="`card-${index}`"
        :value="card.value"
        :visible="card.visible"
        :position="index"
        @select-card="flipCard"
      />
    </section>
    <Transition name="submitScoreModal">
      <div v-if="uncovered === 8" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"><h1>Congrats!</h1></slot>
            </div>
            <div class="modal-body">
              <slot name="body"
                ><h3>You took {{ score }} tries.</h3>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <input
                  id="name-input"
                  :class="`name-input ${isNameValid ? '' : 'red-border'}`"
                  type="text"
                  v-model="name"
                  :placeholder="
                    isNameValid ? 'Your Name' : 'Please enter a valid name'
                  "
                />
                <button
                  id="button"
                  class="button"
                  @click="validateAndSubmitScore(name)"
                >
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal
    <div class="modal" v-if="showModal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h3>Modal Title</h3>
        <p>Modal content goes here...</p>
        <button @click="toggleModal">Scoreboard</button>
        <button @click="toggleModal">Nochmal Spielen</button>
      </div>
    </div> -->
    <h2 class="status">{{ status }}</h2>
    <h2>Versuche: {{ score }}</h2>
    <button class="restart-button" @click="restartGame">Neu starten</button>
  </div>
</template>
<script src="./MemoryGameView"></script>
<style src="./MemoryGameView.css"></style>
