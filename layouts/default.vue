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
.animated {
  transition: all 0.8s;
}
.full-height {
  min-height: calc(100vh - 104px);
  padding-bottom: 50px;
  overflow-y: scroll;
}
.fixed {
  position: fixed;
  z-index: 99999;
}
.mt {
  margin-top: 64px;
}
.pt {
  padding-top: 64px;
}
.no-margin {
  margin: 0;
}
.disable-link {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.6;
  text-decoration: none;
}
.underline {
  text-decoration: underline;
}
.shadow {
  box-shadow: 0 5px 38px rgba(0, 0, 0, 0.3), 2px 5px 12px rgba(0, 0, 0, 0.3);
}
.empty {
  text-align: center;
  color: #a3a3a3;
}
#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.89) !important;
  overflow: hidden;
  z-index: 999999;
}
.scale-down {
  transform: scale(0);
}
.fade-out {
  pointer-events: none;
  opacity: 0;
}
.scroll-up {
  top: -100px !important;
}
.scroll-down {
  bottom: -100px !important;
}
// Mobile Views
@media screen and (max-width: 600px) {
  .mt {
    margin-top: 56px;
  }
}
</style>
