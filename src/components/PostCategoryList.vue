<template>
  <div class="row">
    <div class="col-12">
      <div class="post-category-list">
        <router-link
            :to="`/community/${boardId}`"
            @click="getPostsInBoard">
          전체
        </router-link>
        <router-link
            v-for="postCategory in postCategories"
            :key="postCategory.postCategoryId"
            :to="`/community/${boardId}?category=${postCategory.postCategoryId}`"
            @click="getPostsInPostCategory(postCategory.postCategoryId)">
          {{ postCategory.topic }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import axios from "@/axios";
import {useRoute} from "vue-router";
import {useStore} from "vuex"

export default {
  setup(props, context) {
    const route = useRoute();
    const store = useStore();
    const boardId = route.params.boardId;
    const posts = ref([]);
    const page = ref(10);

    const postCategories = computed(() => store.state.postCategoryList.postCategories.postCategories);

    const getPostsInBoard = async () => {
      const res = await axios.get(
          `api/post/all?board=${boardId}&page=${page.value}`
      );
      posts.value = res.data.content;
      context.emit('get-posts-in-board', posts.value);
    }

    getPostsInBoard();

    const getPostsInPostCategory = async (postCategoryId) => {
      const res = await axios.get(
          `api/post?category=${postCategoryId}&page=${page.value}`
      );
      posts.value = res.data.content;
      context.emit('get-posts-in-category', posts.value);
    }

    return {
      boardId,
      postCategories,
      posts,
      getPostsInPostCategory,
      getPostsInBoard,
    };
  },
  created() {
    this.$store.dispatch('postCategoryList/getPostCategoriesInBoard', {
      id: this.$route.params.boardId,
    })
  }
}
</script>

<style scoped>
.post-category-list {
  display: inline-flex;
  flex-wrap: wrap;
}

.post-category-list a {
  font-size: 14px;
  padding: 4px 6px;
  margin: 4px 4px 4px 0;
  color: #FFFFFF;
  background-color: #8977AD;
  border-radius: 8px;
}
</style>