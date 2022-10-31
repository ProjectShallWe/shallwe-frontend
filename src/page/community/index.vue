<template>
  <div class="container">
    <BoardCategory/>
    <SixPostLists />
  </div>
</template>

<script>
import BoardCategory from "@/components/BoardCategoryList";
import SixPostLists from "@/components/SixPostLists";

export default {
  components: {
    SixPostLists,
    BoardCategory,
  }
}
</script>

<style scoped>
</style>