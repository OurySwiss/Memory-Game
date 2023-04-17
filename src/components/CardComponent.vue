<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img class="card-image" :src="value.url" :alt="value.title" />
    </div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>

<script>
export default {
  props: {
    matched: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectCard() {
      this.$emit('select-card', {
        position: this.position,
        faceValue: this.value.title,
      });
    },
  },
  computed: {
    flippedStyles() {
      if (this.visible) {
        return 'is-flipped';
      }
      return null;
    },
  },
};
</script>

<style>
.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
}

.card {
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
  color: white;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face.is-front {
  text-decoration: none;
  transform: rotateY(180deg);
  align-items: center;
}

.card-image {
  width: 100px;
  height: 100px;
}

.card-face.is-back {
  background-color: blue;
  color: white;
  border: 5px solid #ccc;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
