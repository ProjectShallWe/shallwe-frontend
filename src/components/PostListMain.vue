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
              @click="getPostsInBoard(0)">
            전체
          </a>
          <a
              v-for="postCategory in board[0]?.postCategories"
              :key="postCategory.postCategoryId"
              :href="`/community/${boardId}?category=${postCategory.postCategoryId}`"
              @click="getPostsInPostCategory(postCategory.postCategoryId, 0)"
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
                  :href="getPostDetailUrl(post)"
              >
                <div>
                  {{ post.title }}
                </div>
                <div class="comment-count">
                  [{{post.commentCount}}]
                </div>
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
            :page="pageNum"
            :total-pages="totalPages"
            @on-click="getPosts"
        />
        <BoardSearchBar
            @search="getPosts"/>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex"
import Pagination from "@/components/Pagination";
import BoardSearchBar from "@/components/BoardSearchBar";

export default {
  name: "PostListMain.vue",
  components: {
    Pagination,
    BoardSearchBar
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const boardId = route.params.boardId;
    const categoryId = route.query.category;
    const pageParam = route.query.page;
    const typeParam = route.query.type;
    const keywordParam = route.query.keyword;
    const posts = computed(() => store.state.postListMain.posts);
    const pageNum = computed(() => store.state.postListMain.page);
    const totalPages = computed(() => store.state.postListMain.totalPages);

    const url = ref("");

    const types = ref("");
    const keywords = ref("");

    const board = computed(() => store.state.postListMain.board);

    const getPostDetailUrl = (post) => {
      url.value = `/community/${boardId}/${post.postId}`;

      if (categoryId) {
        return url.value + `?category=${post.postCategoryId}`;
      }

      return url.value;
    }

    const getPostsInBoard = (page) =>
        store.dispatch("postListMain/getPostsInBoard", {boardId, page});

    const getPostsInPostCategory = (categoryId, page) =>
        store.dispatch("postListMain/getPostsInPostCategory", {categoryId, page});

    const getPostsBySearchKeywordInBoard = (page, type, keyword) =>
        store.dispatch("postListMain/getPostsBySearchKeywordInBoard", {boardId, page, type, keyword});

    const getPostsBySearchKeywordInPostCategory = (categoryId, page, type, keyword) =>
        store.dispatch("postListMain/getPostsBySearchKeywordInPostCategory", {boardId, categoryId, page, type, keyword})

    // SearchCondition에 Param이 있는지 확인
    const isSearchCondition = (types, keywords) => {
      return types.value && keywords.value;
    }

    const getPosts = (page, type, keyword, categoryId) => {
      // SearchCondition 을 유지하면서 Pagination 하기 위해 변수에 저장
      if (type !== undefined && keyword !== undefined) {
        types.value = type;
        keywords.value = keyword;
      }

      // Category Yes, SearchCondition No
      if (categoryId && !isSearchCondition(types, keywords)) {
        console.log("getPostsInPostCategory");
        return getPostsInPostCategory(categoryId, page);
      }
      // Category No, SearchCondition Yes
      if (!categoryId && isSearchCondition(types, keywords)) {
        console.log("getPostsBySearchKeywordInBoard");
        return getPostsBySearchKeywordInBoard(page, types.value, keywords.value);
      }
      // Category Yes, SearchCondition Yes
      if (categoryId && isSearchCondition(types, keywords)) {
        console.log("getPostsBySearchKeywordInPostCategory");
        return getPostsBySearchKeywordInPostCategory(categoryId, page, types.value, keywords.value);
      }
      // Category No, SearchCondition No
      console.log("getPostsInBoard")
      return getPostsInBoard(page);
    };

    const pageParamResolver = (page) => {
      // pageParam이 undefined일 경우, page값이 NAN이 되는 것을 방지하기 위한 방어코드.
      if (!pageParam) {
        return 0;
      }
      return page;
    }

    getPosts(pageParamResolver(pageParam -1), typeParam, keywordParam, categoryId);

    return {
      posts,
      boardId,
      categoryId,
      board,
      pageNum,
      totalPages,
      getPostDetailUrl,
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

.title a {
  display: flex;
}

.title div {
  margin-right: 6px;
}

.title div:last-child {
  color: #8977AD;
  margin-right: 0;
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