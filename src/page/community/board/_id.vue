<template>
  <div class="container">
    <Header />
    <BoardCategoryList />
    <div class="row">
      <BoardMini />
      <BoardMini />
      <BoardMini />
    </div>
    <PostListMain />
    <BoardSearchBar />
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import BoardMini from "@/components/PostListMini";
import Footer from "@/components/Footer";
import PostListMain from "@/components/PostListMain";
import BoardSearchBar from "@/components/BoardSearchBar";

export default {
  components: {
    BoardCategoryList,
    BoardSearchBar,
    Header,
    BoardMini,
    PostListMain,
    Footer
  }
}
</script>

<style scoped>
</style>