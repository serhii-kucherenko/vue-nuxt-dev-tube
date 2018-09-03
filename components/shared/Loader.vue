<template>
    <div id="loader">
        <div v-if="main" id="main">
            <div class="loader">
                <div class="loader--dot"></div>
                <div class="loader--dot"></div>
                <div class="loader--dot"></div>
                <div class="loader--dot"></div>
                <div class="loader--dot"></div>
                <div class="loader--dot"></div>
                <div class="loader--text"></div>
            </div>
        </div>
        <div v-else-if="indeterminate" class="progress">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    main: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //TODO - Handle toast on search page
    const badConnectionHandler = setInterval(() => {
      if (this.loading)
        this.$toast.error("Bad connection <br /> Please, wait...");
      else clearInterval();
    }, 6000);
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
#loader {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #cecdcdde;
  z-index: 9999;
}
#main {
  color: #eb8c79;
}

// Main
$loader--width: 250px;
$loader-dot--size: 20px;
.loader {
  height: $loader-dot--size;
  width: $loader--width;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  &--dot {
    animation-name: loader;
    animation-timing-function: ease-in-out;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    height: $loader-dot--size;
    width: $loader-dot--size;
    border-radius: 100%;
    background-color: black;
    position: absolute;
    border: 2px solid white;

    &:first-child {
      background-color: #8cc759;
      animation-delay: 0.5s;
    }

    &:nth-child(2) {
      background-color: #8c6daf;
      animation-delay: 0.4s;
    }

    &:nth-child(3) {
      background-color: #ef5d74;
      animation-delay: 0.3s;
    }

    &:nth-child(4) {
      background-color: #f9a74b;
      animation-delay: 0.2s;
    }

    &:nth-child(5) {
      background-color: #60beeb;
      animation-delay: 0.1s;
    }

    &:nth-child(6) {
      background-color: #fbef5a;
      animation-delay: 0s;
    }
  }

  &--text {
    position: absolute;
    top: 200%;
    left: 0;
    right: 0;
    width: 4rem;
    margin: auto;

    &:after {
      content: "Loading";
      font-weight: bold;
      animation-name: loading-text;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }
  }
}
@keyframes loader {
  15% {
    transform: translateX(0);
  }

  45% {
    transform: translateX($loader--width - $loader-dot--size);
  }

  65% {
    transform: translateX($loader--width - $loader-dot--size);
  }

  95% {
    transform: translateX(0);
  }
}
@keyframes loading-text {
  0% {
    content: "Loading";
  }

  25% {
    content: "Loading.";
  }

  50% {
    content: "Loading..";
  }

  75% {
    content: "Loading...";
  }
}
</style>