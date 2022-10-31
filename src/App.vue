<template>
  <div id="App">
    <Navbar />
    <router-view :key="$route.fullPath"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Navbar,
  },
}
</script>

<style lang="scss">
@import "assets/scss/main.scss";
</style>
