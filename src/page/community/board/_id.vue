<template>
  <div class="container">
    <Header />
    <BoardCategoryList />
    <TwoPostLists />
    <PostListMain />
    <BoardSearchBar />
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import Footer from "@/components/Footer";
import PostListMain from "@/components/PostListMain";
import BoardSearchBar from "@/components/BoardSearchBar";
import TwoPostLists from "@/components/TwoPostLists";

export default {
  components: {
    TwoPostLists,
    BoardCategoryList,
    BoardSearchBar,
    Header,
    PostListMain,
    Footer
  }
}
</script>

<style scoped>
</style>