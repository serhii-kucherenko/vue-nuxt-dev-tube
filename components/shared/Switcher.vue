<template>
  <div class="switch">
    <label>
      {{ labelOff }}
      <input type="checkbox" @input="changeSwitch">
      <span class="lever"></span>
      {{ labelOn }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    labelOn: {
      type: String,
      default: "On"
    },
    labelOff: {
      type: String,
      default: "Off"
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeSwitch() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

<style scoped>
</style>