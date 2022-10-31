<template>
  <div class="container">
    <Header/>
    <BoardCategoryList/>
    <SearchResult/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import SearchResult from "@/components/SearchResult";

export default {
  components: {
    Header,
    BoardCategoryList,
    SearchResult,
  }


}
</script>

<style scoped>

</style>