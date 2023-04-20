<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img class="card-image" :src="value.url" :alt="value.title" />
    </div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>
<script src="./CardComponent"></script>
<style src="./CardComponent.css"></style>
