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
    <h2 class="status">{{ status }}</h2>
    <h2>Versuche: {{ score }}</h2>
  </div>
</template>
<script src="@/views/MemoryGameView/MemoryGameView"></script>
<style src="@/views/MemoryGameView/MemoryGameView.css"></style>
