<template>
  <div class="container">
    <Header />
    <BoardCategoryList/>
    <PostDetail />
    <CommentList />
    <PostListMain />
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import PostListMain from "@/components/PostListMain";
import PostDetail from "@/components/PostDetail";
import CommentList from "@/components/CommentList";

export default {
  components: {
    CommentList,
    PostDetail,
    PostListMain,
    BoardCategoryList,
    Header,
  },
}
</script>

<style scoped>

</style>