<template>
  <div class="row">
    <PostListMini
        v-for="boardRecommendPost in boardsRecommendPosts"
        :key="boardRecommendPost.boardId"
        :recommend-posts="boardRecommendPost"
    />
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
    console.log(boardsRecommendPosts);
    const getRecommendPostsInBoardsFromRedis = async () => {
      await store.dispatch("postListMini/getRecommendPostsInBoardsFromRedis", {
        boardCategoryIdLists: [1, 3, 6, 4, 9, 11]
      })
    };

    getRecommendPostsInBoardsFromRedis();

    return {
      boardsRecommendPosts,
    }
  },
}
</script>

<style scoped>

</style>