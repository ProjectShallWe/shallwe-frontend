<template>
  <div class="row">
    <div class="col-12">
      <div class="wrapper">
        <h1 class="board-title">
          게시판 제목
        </h1>
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
              @click="getPostsInPostCategory(postCategory.postCategoryId)"
          >
            {{ postCategory.topic }}
          </router-link>
        </div>
        <table class="post-list">
          <thead>
          <tr>
            <th scope="col" class="category">
              카테고리
            </th>
            <th scope="col" class="title">
              제목
            </th>
            <th scope="col" class="nickname">
              글쓴이
            </th>
            <th scope="col" class="create_date">
              날짜
            </th>
            <th scope="col" class="like_count">
              좋아요
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="post in posts"
              :key="post.postId"
          >
            <td class="category">
              {{ post.postCategory }}
            </td>
            <td class="title">
              <a
                :href="`/community/${boardId}/${post.postId}`"
              >
                {{ post.title }}
              </a>
            </td>
            <td class="nickname">
              {{ post.nickname }}
            </td>
            <td class="create_date">
              {{ post.createdDate }}
            </td>
            <td class="like_count">
              {{ post.likeCount }}
            </td>
          </tr>
          </tbody>
        </table>
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
  name: "PostListMain.vue",

  setup() {
    const route = useRoute();
    const store = useStore();
    const boardId = route.params.boardId;
    const categoryId = route.query.category;
    const posts = ref([]);
    const page = ref(10);

    console.log(categoryId);

    const postCategories = computed(() => store.state.postListMain.postCategories.postCategories);

    const getPostsInBoard = async () => {
      const res = await axios.get(
          `api/post/all?board=${boardId}&page=${page.value}`
      );
      posts.value = res.data.content;
    }

    const getPostsInPostCategory = async (postCategoryId) => {
      const res = await axios.get(
          `api/post?category=${postCategoryId}&page=${page.value}`
      );
      posts.value = res.data.content;
    }

    const getPosts = () => {
      // posts에 값이 들어있다면 초기화.
      if (posts.value.length != 0) {
        posts.value = [];
      }

      if (categoryId !== undefined) {
        return getPostsInPostCategory(categoryId);
      } else {
        return getPostsInBoard();
      }
    }

    getPosts();

    return {
      posts,
      boardId,
      categoryId,
      postCategories,
      getPostsInPostCategory,
      getPostsInBoard,
      getPosts,
    };
  },
  created() {
    this.$store.dispatch('postListMain/getPostCategoriesInBoard', {
      id: this.$route.params.boardId,
    });
  }
}
</script>

<style scoped>
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.board-title {
  font-size: 17px;
  padding: 8px 0;
}

.wrapper table {
  display: table;
  text-align: center;
  table-layout: fixed;
  width: 100%;
  font-size: 14px;
}

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

.post-list thead {
  border-bottom: #8977AD solid 1px;
}

.post-list tbody tr td {
  border-bottom: #D3D3D3 solid 1px;
}

tbody tr td.title {
  text-align: left;
}

.category {
  width: 10%;
  padding: 8px;
}

.title {
  width: 60%;
  padding: 6px;
}

.nickname {
  width: 12%;
  padding: 6px;
}

.create_date {
  width: 6%;
  padding: 6px;
}

.like_count {
  width: 12%;
  padding: 6px;
}
</style>