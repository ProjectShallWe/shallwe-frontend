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

    const getRecommendPostsInBoards = async () => {
      await store.dispatch("postListMini/getRecommendBoardsFromRedis");

      await store.dispatch("postListMini/getRecommendPostsInBoardsFromRedis", {
        boardRecommendIdList: store.state.postListMini.recommendBoards.boardRecommendIdList,
      })
    };

    getRecommendPostsInBoards();

    return {
      boardsRecommendPosts,
    }
  },
}
</script>

<style scoped>

</style>