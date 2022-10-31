<template>
  <div class="row">
    <div class="col-12">
      <div class="wrapper">
        <div class="post-list-top">
          <h1 class="board-title">
            {{ board[0]?.title }} 게시판
          </h1>
          <button
              v-if="loggedIn"
              type="button"
              class="post-create-button"
              @click="movePostCreate"
          >
            글쓰기
          </button>
        </div>
        <div class="post-category-list">
          <router-link
              :to="`/community/${boardId}`"
              @click="getPostsInBoard(0)">
            전체
          </router-link>
          <router-link
              v-for="postCategory in board[0]?.postCategories"
              :key="postCategory.postCategoryId"
              :to="`/community/${boardId}?category=${postCategory.postCategoryId}`"
              @click="getPostsInPostCategory(postCategory.postCategoryId, 0)"
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
            <th scope="col" class="hits">
              조회 수
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
              <router-link
                  :to="getPostDetailUrl(post)"
              >
                <div>
                  {{ post.title }}
                </div>
                <div class="comment-count">
                  [{{post.commentCount}}]
                </div>
              </router-link>
            </td>
            <td class="nickname">
              {{ post.nickname }}
            </td>
            <td class="create_date">
              {{ post.createdDate }}
            </td>
            <td class="hits">
              {{ post.hits }}
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
            @on-click="setPaginationParam"
        />
        <BoardSearchBar
            @search="setSearchConditionParam"/>
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
    const pageParam = ref(route.query.page);
    const typeParam = ref(route.query.type);
    const keywordParam = ref(route.query.keyword);
    const posts = computed(() => store.state.postListMain.posts);
    const pageNum = computed(() => store.state.postListMain.page);
    const totalPages = computed(() => store.state.postListMain.totalPages);
    const loggedIn = computed(() => store.getters["login/loggedIn"]);

    const types = ref("");
    const keywords = ref("");

    const board = computed(() => store.state.postListMain.board);

    const movePostCreate = () => {
      const basicUrl = `/community/${boardId}/create`;

      if (categoryId) {
        return location.href = basicUrl + `?category=${categoryId}`;
      }

      return location.href = `/community/${boardId}/create`
    }

    const getPostDetailUrl = (post) => {
      const basicUrl = `/community/${boardId}/${post.postId}`;
      const urlParams = new URLSearchParams(window.location.search);

      return basicUrl + "?" + urlParams.toString();
    }

    const getPostsInBoard = (page) =>
        store.dispatch("postListMain/getPostsInBoard", {
          id: boardId,
          page
        });

    const getPostsInPostCategory = (categoryId, page) =>
        store.dispatch("postListMain/getPostsInPostCategory", {
          id: categoryId,
          page
        });

    const getPostsBySearchKeywordInBoard = (page, type, keyword) =>
        store.dispatch("postListMain/getPostsBySearchKeywordInBoard", {
          id: boardId,
          page,
          type,
          keyword
        });

    const getPostsBySearchKeywordInPostCategory = (categoryId, page, type, keyword) =>
        store.dispatch("postListMain/getPostsBySearchKeywordInPostCategory", {
          boardId,
          categoryId,
          page,
          type,
          keyword
        })

    // SearchCondition에 Param이 있는지 확인
    const isSearchCondition = (types, keywords) => {
      return types.value && keywords.value;
    }

    const setPaginationParam = (page) => {
      pageParam.value = page;
    }

    const setSearchConditionParam = (type, keyword) => {
      typeParam.value = type;
      keywordParam.value = keyword;
    }

    const getPosts = (page, type, keyword, categoryId) => {
      console.log("page = " + page);
      console.log("type = " + type);
      console.log("keyword = " + keyword);
      console.log("categoryId = " + categoryId);
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
      if (!pageParam.value) {
        return 0;
      }
      return page;
    }

    getPosts(pageParamResolver(pageParam.value -1), typeParam.value, keywordParam.value, categoryId);

    return {
      posts,
      boardId,
      categoryId,
      board,
      pageNum,
      totalPages,
      loggedIn,
      movePostCreate,
      setPaginationParam,
      setSearchConditionParam,
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

.post-list-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

}

.post-create-button {
  height: 40px;
  width: 80px;
  color: #F8F8F8;
  background-color: #8977AD;
  border-radius: 8px;
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
  margin-bottom: 8px;
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

.hits {
  width: 6%;
}

.like_count {
  width: 6%;
  padding: 6px;
}
</style>