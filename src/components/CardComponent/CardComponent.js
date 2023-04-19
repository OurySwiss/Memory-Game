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
