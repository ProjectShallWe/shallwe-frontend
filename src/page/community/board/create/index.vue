<template>
  <div class="container">
    <BoardCategoryList />
    <PostCreate />
  </div>
</template>

<script>
import BoardCategoryList from "@/components/BoardCategoryList";
import PostCreate from "@/components/PostCreate";
export default {
  components: {
    PostCreate,
    BoardCategoryList,
  }
}
</script>

<style scoped>

</style>