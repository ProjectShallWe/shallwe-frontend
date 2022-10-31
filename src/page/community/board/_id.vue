<template>
  <div class="container">
    <Header />
    <BoardCategoryList />
    <TwoPostLists />
    <PostListMain />
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import PostListMain from "@/components/PostListMain";
import TwoPostLists from "@/components/TwoPostLists";

export default {
  components: {
    TwoPostLists,
    BoardCategoryList,
    Header,
    PostListMain,
  }
}
</script>

<style scoped>
</style>