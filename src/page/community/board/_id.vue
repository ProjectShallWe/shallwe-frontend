<template>
  <div class="container">
    <Header />
    <BoardCategoryList />
    <div class="row">
      <BoardMini />
      <BoardMini />
      <BoardMini />
    </div>
    <PostListMain />
    <Pagination />
    <BoardSearchBar />
    <Footer/>
  </div>
</template>

<script>
import {useRoute} from 'vue-router';
import Header from "@/components/Header";
import BoardCategoryList from "@/components/BoardCategoryList";
import BoardMini from "@/components/PostListMini";
import Footer from "@/components/Footer";
import PostListMain from "@/components/PostListMain";
import Pagination from "@/components/Pagination";
import BoardSearchBar from "@/components/BoardSearchBar";

export default {
  components: {
    BoardCategoryList,
    BoardSearchBar,
    Pagination,
    Header,
    BoardMini,
    PostListMain,
    Footer
  },
  setup() {
    const boardId = useRoute().params.boardId;
    console.log(boardId);
    return {
      boardId,
    };
  },
}
</script>

<style scoped>
</style>