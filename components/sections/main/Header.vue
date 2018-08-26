<template>
    <nav class="fixed teal darken-4 z-depth-3" role="navigation">
        <div class="container nav-wrapper">
            <logo />
            <main-menu 
                :loginPage="loginPage" 
                @logout="logout" 
            />
            <mobile-menu 
                :loginPage="loginPage" 
                @logout="logout"
            />
            <mobile-menu-button class="right" />
        </div>
    </nav>
</template>

<script>
import { mapActions } from "vuex";

import Logo from "./header/Logo";
import MainMenu from "./header/MainMenu";
import MobileMenuButton from "./header/MobileMenuButton";
import MobileMenu from "./header/MobileMenu";

export default {
  components: {
    Logo,
    MainMenu,
    MobileMenuButton,
    MobileMenu
  },
  props: {
    loginPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(["signOut"]),
    logout() {
      this.signOut()
        .then(() => this.$toast.info("Logging out...", { icon: "fingerprint" }))
        .then(() => {
          this.$router.go("/login");
        });
    }
  }
};
</script>

<style lang="scss">
nav {
  top: 0;

  & a,
  ul > li > a {
    color: white;
  }

  & ul > li > a {
    transition: all 0.6s;
  }
  & ul > li > a:hover {
    background: rgb(185, 166, 166);
    font-size: 1.2rem;
  }
}
</style>