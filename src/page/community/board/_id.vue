<template>
  <div class="container">
    <BoardCategoryList />
    <TwoPostLists />
    <PostListMain />
  </div>
</template>

<script>
import BoardCategoryList from "@/components/BoardCategoryList";
import PostListMain from "@/components/PostListMain";
import TwoPostLists from "@/components/TwoPostLists";

export default {
  components: {
    TwoPostLists,
    BoardCategoryList,
    PostListMain,
  }
}
</script>

<style scoped>
</style>