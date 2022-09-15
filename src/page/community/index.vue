<template>
  <div class="container">
    <Header/>
    <BoardCategory/>
    <SixPostLists />
    <Footer/>
  </div>

</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BoardCategory from "@/components/BoardCategoryList";
import SixPostLists from "@/components/SixPostLists";

export default {
  components: {
    SixPostLists,
    Header,
    BoardCategory,
    Footer,
  }
}
</script>

<style scoped>
</style>