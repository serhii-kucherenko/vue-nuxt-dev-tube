<template>
  <div class="grey lighten-2">
    <Header />
    <nuxt id="app" class="full-height mt" />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/sections/main/Header";
import Footer from "@/components/sections/main/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import "assets/css/animations.css";

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
// Mobile Views
@media screen and (max-width: 600px) {
  .mt {
    margin-top: 56px;
  }
}
</style>
