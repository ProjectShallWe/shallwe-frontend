<template>
  <div class="container">
    <BoardCategoryList />
    <PostEdit />
  </div>
</template>

<script>
import BoardCategoryList from "@/components/BoardCategoryList";
import PostEdit from "@/components/PostEdit";
export default {
  components: {
    PostEdit,
    BoardCategoryList,
  }
}
</script>

<style scoped>

</style>