<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">Front</div>
    <div v-else class="card-face is-back">Back</div>
  </div>
</template>
<script>
const options = { method: "GET" };
fetch("https://memory-api.dev-scapp.swisscom.com/cards", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
export default {
  props: {
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
      });
    };
    return {
      selectCard,
    };
  },
};
</script>
<style>
.card {
  border: 5px solid #ccc;
  position: relative;
}

.card-face.is-front {
  background-color: red;
  color: white;
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
