<template>
  <div class="container">
    <Header />
    <BoardCategoryList />
    <PostCreate />
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import PostCreate from "@/components/PostCreate";
export default {
  components: {
    PostCreate,
    BoardCategoryList,
    Header,
  }
}
</script>

<style scoped>

</style>