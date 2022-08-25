<template>
  <div class="container">
    <Header/>
    <BoardCategory/>
    <div class="row">
      <BoardMini />
      <BoardMini />
      <BoardMini />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategory from "@/components/BoardCategoryList";
import BoardMini from "@/components/PostListMini";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    BoardCategory,
    BoardMini,
    Footer
  },
}
</script>

<style scoped>
</style>