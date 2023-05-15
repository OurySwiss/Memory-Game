<template>
  <div>
    <h2>Maximale Versuche: {{ maxAttempts }}</h2>
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
    <!-- Neues Modal -->
    <Transition name="start-Game-Modal">
      <div v-if="showStartModal" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h1>Willkommen zum Spiel!</h1>
            </div>
            <div class="modal-body">
              <p>Wähle einen Schwierigkeitsgrad:</p>
              <button class="submit-button" @click="setDifficulty('easy')">
                Leicht
              </button>
              <button class="submit-button" @click="setDifficulty('medium')">
                Mittel
              </button>
              <button class="submit-button" @click="setDifficulty('hard')">
                Schwer
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- Vorhandenes Modal -->
    <Transition name="submit-Score-Modal">
      <div v-if="uncovered === 8" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"><h1>Glückwunsch!</h1></slot>
            </div>
            <div class="modal-body">
              <slot name="body"
                ><h3>Du hast {{ score }} versuche gebraucht.</h3>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <input
                  ref="nameInput"
                  :class="`name-input ${isNameValid ? '' : 'red-border'}`"
                  type="text"
                  v-model="name"
                  :placeholder="
                    isNameValid ? 'Your Name' : 'Please enter a valid name'
                  "
                />
                <button class="submit-button" @click="postScore()">OK</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- Game Over Modal -->
    <Transition name="game-Over-Modal">
      <div v-if="showGameOverModal" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h1>Spiel vorbei!</h1>
            </div>
            <div class="modal-body">
              <p>Du hast das Spiel verloren.</p>
              <button class="submit-button" @click="goToGame()">
                Neues Spiel
              </button>
              <button class="submit-button" @click="goToScoreboard()">
                Scoreboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <h2 class="status">{{ status }}</h2>
    <h2>Versuche: {{ score }}</h2>
    <h2>Verbleibende Zeit: {{ remainingTime }} Sekunden</h2>
  </div>
</template>
<script src="@/views/MemoryGameView/MemoryGameView"></script>
<style src="@/views/MemoryGameView/MemoryGameView.css"></style>
