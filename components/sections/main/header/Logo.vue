<template>
   <nuxt-link
            to="/"
            id="logo" 
            class="center black white-text"
    >
        Dev<span class="red-text">Tube</span>
    </nuxt-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#logo {
  font-size: 26px;
  padding: 18px;
}

#logo,
span {
  transition: all 0.6s;
}

#logo:hover {
  background-color: red !important;
  color: black !important;

  & span {
    color: white !important;
  }
}

@media screen and (max-width: 600px) {
  #logo {
    font-size: 20px;
  }
}
</style>