<template>
  <div>
    <Header />
    <Content />
     <Footer />
  </div>
</template>

<script>
import Header from "@/components/sections/main/Header";
import Content from "@/components/sections/main/Content";
import Footer from "@/components/sections/main/Footer";

export default {
  components: {
    Header,
    Content,
    Footer
  }
};
</script>

<style>
</style>
