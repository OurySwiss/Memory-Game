<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img :src="value.url" :alt="value.title" />
    </div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>

<script>
import { computed } from "vue";
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
  setup(props, context) {
    // eslint-disable-next-line vue/return-in-computed-property
    const flippedStyles = computed(() => {
      if (props.visible) {
        return "is-flipped";
      }
    });
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value.title,
      });
    };
    return {
      selectCard,
      flippedStyles,
    };
  },
};
</script>

<style>
.card {
  border: 5px solid #ccc;
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
  color: white;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face.is-front {
  background-color: red;
  color: white;
  text-decoration: none;
}

.card-face.is-back {
  background-color: blue;
  color: white;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  justify-content: center;
}
</style>
