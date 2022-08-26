<template>
  <div class="container">
    <Header />
    <BoardCategoryList/>
    <PostDetail />
    <CommentList />
    <PostListMain />
    <Pagination />
    <BoardSearchBar />
    <Footer/>
  </div>
    <h1> PostDetail </h1>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import PostListMain from "@/components/PostListMain";
import Pagination from "@/components/Pagination";
import BoardSearchBar from "@/components/BoardSearchBar";
import PostDetail from "@/components/PostDetail";
import CommentList from "@/components/CommentList";
export default {
  components: {
    CommentList,
    PostDetail,
    BoardSearchBar,
    Pagination,
    PostListMain,
    BoardCategoryList,
    Header
  },
}
</script>

<style scoped>

</style>