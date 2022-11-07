<template>
  <div class="container">
    <TwoPostLists />
    <PostListMain />
  </div>
</template>

<script>
import PostListMain from "@/components/PostListMain";
import TwoPostLists from "@/components/TwoPostLists";

export default {
  components: {
    TwoPostLists,
    PostListMain,
  }
}
</script>

<style scoped>
</style>