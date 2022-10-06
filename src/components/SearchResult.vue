<template>
  <div v-if="boards.length === 0 && posts.length=== 0">
    "검색 결과가 없습니다."
  </div>

  <!-- 게시판 검색 결과 -->
  <div v-if="boards.length > 0"
      class="board-result">
    <h1>
      게시판 검색 결과
    </h1>
    <ul class="board-list">
      <li v-for="board in boards"
          :key="board.boardId"
          class="board">
        <h2 class="board-title">
          <a :href="`/community/${board.boardId}`">
            {{ board.title }} 게시판
          </a>
        </h2>
      </li>
    </ul>
  </div>
  <!-- 게시물 검색 결과 -->
  <div v-if="posts.length > 0"
      class="post-result">
    <h1>
      게시물
    </h1>
    <ul class="post-list">
      <li v-for="post in posts"
          :key="post.postId"
          class="post">
        <h3 class="post-title">
          <a :href="`/community/${post.boardId}/${post.postId}`">
            {{ post.title }}
          </a>
        </h3>
        <p class="post-content">
          {{ post.content }}
        </p>
        <div class="post-info">
          <a :href="`/community/${post.boardId}`"
             class="post-board">
            {{ post.boardTitle }} 게시판
          </a>
          <p class="post-date">
            {{ post.createdDate }}
          </p>
        </div>
      </li>
    </ul>
    <Pagination
        :page="pageNum"
        :total-pages="totalPages"
        @on-click="setPaginationParam"
    />
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {ref, computed} from "vue";
import Pagination from "@/components/Pagination";

export default {
  components: {Pagination},
  setup() {
    const store = useStore();
    const route = useRoute();
    const keyword = route.query.keyword;
    const pageParam = ref(route.query.page);
    const pageNum = computed(() => store.state.searchResult.page);
    const totalPages = computed(() => store.state.searchResult.totalPages);

    const boards = computed(() => store.state.searchResult.boards);
    const posts = computed(() => store.state.searchResult.posts);

    const setPaginationParam = (page) => {
      page.value = page;
    }

    const pageParamResolver = (page) => {
      // pageParam이 undefined일 경우, page값이 NAN이 되는 것을 방지하기 위한 방어코드.
      if (!pageParam.value) {
        return 0;
      }
      return page;
    }

    const getBoardsByKeyword = () => {
        store.dispatch("searchResult/getBoardsByKeyword", {keyword})
    };

    const getPostsByKeyword = (page = 0) => {
        store.dispatch("searchResult/getPostsByKeyword", {keyword, page})
    };

    getBoardsByKeyword();
    getPostsByKeyword(pageParamResolver(pageParam.value -1));

    return {
      keyword,
      pageNum,
      totalPages,
      setPaginationParam,
      boards,
      posts,
    }
  }
}
</script>

<style scoped>
.board-result {
  margin-bottom: 20px;
}

.board-result h1 {
  font-size: 20px;
  margin-bottom: 16px;
}

.board {
  margin-bottom: 16px;
}

.board-title {
  font-size: 16px;
}

.board-title a {
  color: #1a0dab;
}

.post-result h1 {
  font-size: 20px;
  margin-bottom: 16px;
}

.post {
  margin-bottom: 16px;
}

.post-title {
  color: #1a0dab;
  font-size: 18px;
}

.post-content {
  padding: 0;
  margin: 8px 0;
}

.post-info {
  font-size: 14px;
  display: flex;
}

.post-board {
  color: #3a7c45;
  margin-right: 16px;
}

</style>