<template>
  <div class="row">
    <div class="col-12">
      <div class="wrapper">
        <h1 class="board-title">
          {{ board[0]?.title }} 게시판
        </h1>
        <div class="post-category-list">
          <a
              :href="`/community/${boardId}`"
              @click="getPostsInBoard">
            전체
          </a>
          <a
              v-for="postCategory in board[0]?.postCategories"
              :key="postCategory.postCategoryId"
              :href="`/community/${boardId}?category=${postCategory.postCategoryId}`"
              @click="getPostsInPostCategory(postCategory.postCategoryId)"
          >
            {{ postCategory.topic }}
          </a>
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
        <Pagination
            :page="page"
            :total-pages="totalPages"
            @on-click="getPosts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import axios from "@/axios";
import {useRoute} from "vue-router";
import {useStore} from "vuex"
import Pagination from "@/components/Pagination";

export default {
  name: "PostListMain.vue",
  components: {Pagination},
  setup() {
    const route = useRoute();
    const store = useStore();
    const boardId = route.params.boardId;
    const categoryId = route.query.category;
    const posts = ref([]);
    const page = ref(0);
    const totalPages = ref(0);

    const board = computed(() => store.state.postListMain.board);

    const getPostsInBoard = async (pageParam) => {
      const res = await axios.get(
          `api/post/all?board=${boardId}&page=${pageParam}`
      );
      posts.value = res.data.content;
      page.value = res.data.number;
      totalPages.value = res.data.totalPages;
    }

    const getPostsInPostCategory = async (pageParam, postCategoryId) => {
      const res = await axios.get(
          `api/post?category=${postCategoryId}&page=${pageParam}`
      );
      posts.value = res.data.content;
      page.value = res.data.number;
      totalPages.value = res.data.totalPages;
    }

    const getPosts = (pageParam = page.value) => {
      console.log("pageParam = " + pageParam);
      // posts에 값이 들어있다면 초기화.
      if (!posts.value.length) {
        posts.value = [];
      }

      if (categoryId !== undefined) {
        return getPostsInPostCategory(pageParam, categoryId);
      } else {
        return getPostsInBoard(pageParam);
      }
    }

    getPosts();

    return {
      posts,
      boardId,
      categoryId,
      board,
      page,
      totalPages,
      getPostsInPostCategory,
      getPostsInBoard,
      getPosts,
    };
  },
  created() {
    this.$store.dispatch('postListMain/getBoardWithPostCategories', {
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