<template>
  <div class="row">
    <PostListMini
        :recommend-posts="allRecommendPosts"/>
    <PostListMini
        :recommend-posts="boardRecommendPosts"/>
  </div>
</template>

<script>
import PostListMini from "@/components/PostListMini";
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  components: {
    PostListMini
  },
  setup() {
    const store = useStore();

    const allRecommendPosts = computed(() => store.state.postListMini.allRecommendPosts);
    const boardRecommendPosts = computed(() => store.state.postListMini.boardRecommendPosts);

    return {
      allRecommendPosts,
      boardRecommendPosts
    }
  },
  created() {
    this.$store.dispatch('postListMini/getRecommendPostsFromRedis');
    this.$store.dispatch('postListMini/getRecommendPostsInBoardFromRedis', {
      id: this.$route.params.boardId,
    })
  }
}
</script>

<style scoped>

</style>