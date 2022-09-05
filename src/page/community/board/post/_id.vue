<template>
  <div class="container">
    <Header />
    <BoardCategoryList/>
    <PostDetail />
    <CommentList />
    <PostListMain />
    <BoardSearchBar />
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import PostListMain from "@/components/PostListMain";
import BoardSearchBar from "@/components/BoardSearchBar";
import PostDetail from "@/components/PostDetail";
import CommentList from "@/components/CommentList";
import Footer from "@/components/Footer"
export default {
  components: {
    CommentList,
    PostDetail,
    BoardSearchBar,
    PostListMain,
    BoardCategoryList,
    Header,
    Footer,
  },
}
</script>

<style scoped>

</style>