<template>
  <div class="container">
    <Header/>
    <BoardCategoryList/>
    <SearchResult/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import Footer from "@/components/Footer"
import SearchResult from "@/components/SearchResult";

export default {
  components: {
    Header,
    BoardCategoryList,
    SearchResult,
    Footer
  }


}
</script>

<style scoped>

</style>