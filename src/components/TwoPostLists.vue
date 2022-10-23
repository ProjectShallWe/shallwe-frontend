<template>
  <div class="row">
    <PostListMini
        :key = "allRecommendPosts.boardId"
        :recommend-posts="allRecommendPosts"/>
    <PostListMini
        :key = "boardRecommendPosts.boardId"
        :recommend-posts="boardRecommendPosts"/>
  </div>
</template>

<script>
import PostListMini from "@/components/PostListMini";
import {computed} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  components: {
    PostListMini
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const allRecommendPosts = computed(() => store.state.postListMini.allRecommendPosts);
    const boardRecommendPosts = computed(() => store.state.postListMini.boardRecommendPosts);

    console.log(allRecommendPosts);
    console.log(boardRecommendPosts);

    const getRecommendPostsFromRedis = async () => {
      await store.dispatch("postListMini/getRecommendPostsFromRedis");
    };

    const getRecommendPostsInBoardFromRedis = async () => {
      await store.dispatch("postListMini/getRecommendPostsInBoardFromRedis", {
        id: route.params.boardId
      })
    };

    getRecommendPostsFromRedis();
    getRecommendPostsInBoardFromRedis();

    return {
      allRecommendPosts,
      boardRecommendPosts
    }
  },
}
</script>

<style scoped>

</style>