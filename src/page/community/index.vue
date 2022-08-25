<template>
  <div class="container">
    <Header/>
    <BoardCategory/>
    <div class="row">
      <BoardMini />
      <BoardMini />
      <BoardMini />
      <BoardMini />
      <BoardMini />
      <BoardMini />
    </div>
    <Footer/>
  </div>

</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BoardCategory from "@/components/BoardCategoryList";
import BoardMini from "@/components/PostListMini";

export default {
  components: {
    BoardMini,
    Header,
    BoardCategory,
    Footer,
  }
}
</script>

<style scoped>
</style>