<template>
  <div class="container">
    <BoardCategoryList/>
    <SearchResult/>
  </div>
</template>

<script>
import BoardCategoryList from "@/components/BoardCategoryList";
import SearchResult from "@/components/SearchResult";

export default {
  components: {
    BoardCategoryList,
    SearchResult,
  }


}
</script>

<style scoped>

</style>