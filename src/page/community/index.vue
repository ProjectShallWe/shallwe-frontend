<template>
  <div class="container">
    <Header/>
    <BoardCategory/>
    <SixPostLists />
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategory from "@/components/BoardCategoryList";
import SixPostLists from "@/components/SixPostLists";

export default {
  components: {
    SixPostLists,
    Header,
    BoardCategory,
  }
}
</script>

<style scoped>
</style>