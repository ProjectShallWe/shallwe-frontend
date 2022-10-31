<template>
  <div class="container">
    <BoardCategoryList/>
    <PostDetail />
    <CommentList />
    <PostListMain />
  </div>
</template>

<script>
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
  },
}
</script>

<style scoped>

</style>