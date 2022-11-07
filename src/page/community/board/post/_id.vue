<template>
  <div class="container">
    <PostDetail />
    <CommentList />
    <PostListMain />
  </div>
</template>

<script>
import PostListMain from "@/components/PostListMain";
import PostDetail from "@/components/PostDetail";
import CommentList from "@/components/CommentList";

export default {
  components: {
    CommentList,
    PostDetail,
    PostListMain,
  },
}
</script>

<style scoped>

</style>