<template>
  <div :id="overlayChanger('overlay')" class="animated grey lighten-2">
    <Header :class="overlayChanger('scroll-up')" />
    <nuxt id="app" class="full-height pt" />
    <Footer :class="overlayChanger('scroll-down')" />
  </div>
</template>

<script>
import Header from "@/components/sections/main/Header";
import Footer from "@/components/sections/main/Footer";

import { mapState } from "vuex";

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState({
      isWideMode: state => state.settings.wideMode
    })
  },
  methods: {
    overlayChanger(onOverlay, withoutOverlay = "") {
      return this.isWideMode ? onOverlay : withoutOverlay;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/css/animations.css";
@import "~/assets/css/customClasses.css";

// Mobile Views
@media screen and (max-width: 600px) {
  .mt {
    margin-top: 56px;
  }
}
</style>
