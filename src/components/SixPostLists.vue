<template>
  <div class="row">
    <PostListMini
        :recommend-posts="boardsRecommendPosts[0]"/>
    <PostListMini
        :recommend-posts="boardsRecommendPosts[1]"/>
    <PostListMini
        :recommend-posts="boardsRecommendPosts[2]"/>
    <PostListMini
        :recommend-posts="boardsRecommendPosts[3]"/>
    <PostListMini
        :recommend-posts="boardsRecommendPosts[4]"/>
    <PostListMini
        :recommend-posts="boardsRecommendPosts[5]"/>
  </div>
</template>

<script>
import PostListMini from "@/components/PostListMini";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  components: {
    PostListMini
  },
  setup() {
    const store = useStore();

    const boardsRecommendPosts = computed(() => store.state.postListMini.boardsRecommendPosts);

    return {
      boardsRecommendPosts
    }
  },
  created() {
    this.$store.dispatch('postListMini/getRecommendPostsInBoardsFromRedis', {
      boardCategoryIdLists: [1, 3, 6, 4, 9, 11]
    })
  }
}
</script>

<style scoped>

</style>