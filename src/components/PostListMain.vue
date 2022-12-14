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
              @click="movePostEdit"
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
                  [{{ post.commentCount }}]
                </div>
                <div v-if="!isEmptyString(post.thumbnailUrl)"
                     class="image-icon"
                >
                  <img src="../assets/images/image-2-fill.svg">
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

    const movePostEdit = () => {
      const basicUrl = `/community/${boardId}/edit`;

      if (categoryId) {
        return location.href = basicUrl + `?category=${categoryId}`;
      }

      return location.href = `/community/${boardId}/edit`
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
      // SearchCondition 을 유지하면서 Pagination 하기 위해 변수에 저장
      if (type !== undefined && keyword !== undefined) {
        types.value = type;
        keywords.value = keyword;
      }

      // Category Yes, SearchCondition No
      if (categoryId && !isSearchCondition(types, keywords)) {
        return getPostsInPostCategory(categoryId, page);
      }
      // Category No, SearchCondition Yes
      if (!categoryId && isSearchCondition(types, keywords)) {
        return getPostsBySearchKeywordInBoard(page, types.value, keywords.value);
      }
      // Category Yes, SearchCondition Yes
      if (categoryId && isSearchCondition(types, keywords)) {
        return getPostsBySearchKeywordInPostCategory(categoryId, page, types.value, keywords.value);
      }
      // Category No, SearchCondition No
      return getPostsInBoard(page);
    };

    const pageParamResolver = (page) => {
      // pageParam이 undefined일 경우, page값이 NAN이 되는 것을 방지하기 위한 방어코드.
      if (!pageParam.value) {
        return 0;
      }
      return page;
    }

    const isEmptyString = (value) => {
      return value.length === 0;
    }

    getPosts(pageParamResolver(pageParam.value - 1), typeParam.value, keywordParam.value, categoryId);

    return {
      posts,
      boardId,
      categoryId,
      board,
      pageNum,
      totalPages,
      loggedIn,
      movePostEdit,
      setPaginationParam,
      setSearchConditionParam,
      getPostDetailUrl,
      getPostsInPostCategory,
      getPostsInBoard,
      getPosts,
      isEmptyString,
    };
  },
  created() {
    this.$store.dispatch('postListMain/getBoardWithPostCategories', {
      id: this.$route.params.boardId,
    });
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .post-list-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    .board-title {
      font-size: 18px;
      padding: 8px 0;
    }

    .post-create-button {
      height: 40px;
      width: 80px;
      border: $TERTIARY_COLOR solid 1px;
      border-radius: 8px;

      &:hover {
        color: $PRIMARY_COLOR;
        background-color: $SECONDARY_COLOR;
      }
    }
  }

  .post-category-list {
    display: inline-flex;
    flex-wrap: wrap;
    margin-bottom: 8px;

    a {
      font-size: 14px;
      padding: 4px 6px;
      margin: 4px 4px 4px 0;
      border: $TERTIARY_COLOR solid 1px;
      border-radius: 8px;

      &:hover {
        color: $PRIMARY_COLOR;
        background-color: $SECONDARY_COLOR;
      }
    }
  }

  .post-list {
    display: table;
    text-align: center;
    table-layout: fixed;
    width: 100%;
    font-size: 14px;

    thead {
      border-bottom: $SECONDARY_COLOR solid 1px;
    }

    tbody {
      tr {
        td {
          border-bottom: $TERTIARY_COLOR solid 1px;
        }

        .title {
          text-align: left;

          .image-icon {
            width: 16px;
            height: auto;
          }
        }
      }
    }

    * {
      .category {
        width: 10%;
        padding: 8px 0;
      }

      .title {
        width: 60%;

        a {
          display: flex;
          align-items: center;

          div {
            max-width: 95%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 4px;

            &:last-child {
              margin-right: 0;
            }
          }

          .comment-count {
            font-size: 12px;
            color: $POINT_COLOR;
          }
        }
      }

      .nickname {
        width: 12%;
      }

      .create_date {
        width: 6%;
      }

      .hits {
        width: 6%;
      }

      .like_count {
        width: 6%;
      }
    }
  }
}

</style>