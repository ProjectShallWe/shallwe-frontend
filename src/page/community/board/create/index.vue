<template>
  <div class="container">
    <Header />
    <BoardCategoryList />
    <PostCreate />
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BoardCategoryList from "@/components/BoardCategoryList";
import PostCreate from "@/components/PostCreate";
export default {
  components: {
    PostCreate,
    BoardCategoryList,
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>