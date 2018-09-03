<template>
    <div class="spinner" @click="emitEvent">
        <span v-if="loading"></span>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    emitEvent() {
      this.$emit("onClickEvent");
    }
  }
};
</script>

<style scoped>
:root {
  --wg-color: orange;
  --wg-width: 34px;
}

.spinner {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid grey;
  height: var(--wg-width);
  width: var(--wg-width);
  border-radius: 50%;
  line-height: var(--wg-width);
  color: orange;
  text-align: center;
  font-size: 20px;
  letter-spacing: 4px;
  font-weight: bold;
  font-family: sans-serif;
  text-shadow: 0 0 10px var(--wg-color);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

span {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 2px;
  background: orange;
  transform-origin: left;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  animation: animate 2s linear infinite;
}
span:before {
  content: "";
  position: absolute;
  top: -3px;
  right: -6px;
  width: 8px;
  height: 8px;
  background: orange;
  text-shadow: 0 0 10px orange;
  border-radius: 50%;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>