<template>
    <ul class="right hide-on-med-and-down">
        <li v-if="!loginPage">
            <nuxt-link to="/profile">Profile</nuxt-link>
        </li>
        <li v-if="!loginPage">
            <a @click="logout">Log Out</a>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    loginPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout() {
      this.$emit("logout");
    }
  }
};
</script>

<style scoped>
</style>