<template>
  <footer class="page-footer center white-text z-depth-4 orange darken-4">
        Made by <a href="mailto:kucherenko.web@gmail.com">sergey kucherenko</a>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  font-size: 18px;
  height: 38px;
  width: 100%;
  bottom: 0;
  position: fixed;
  z-index: 99999;
  transition: all 1s;
}
.page-footer {
  padding-top: 6px;
}
a {
  color: white;
  text-decoration: underline;
}
</style>