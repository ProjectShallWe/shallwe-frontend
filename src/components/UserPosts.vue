<template>
  <h2 class="info-title">
    게시글
  </h2>
  <table class="post-list">
    <thead>
    <tr>
      <th scope="col" class="post-num">
        번호
      </th>
      <th scope="col" class="post-board">
        게시판
      </th>
      <th scope="col" class="post-title">
        제목
      </th>
      <th scope="col" class="post-create_date">
        날짜
      </th>
      <th scope="col" class="post-like_count">
        좋아요
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="post in posts"
        :key="post.postId"
    >
      <td class="page-num">
        {{ post.postId }}
      </td>
      <td class="post-board">
        {{ post.boardTitle }}
      </td>
      <td class="post-title">
        <a
            :href="`/community/${post.boardId}/${post.postId}`"
        >
          <div>
            {{ post.title }}
          </div>
          <div class="post-comment-count">
            [{{post.commentCount}}]
          </div>
        </a>
      </td>
      <td class="post-create_date">
        {{ post.createdDate }}
      </td>
      <td class="post-like_count">
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
</template>

<script>
import Pagination from "@/components/Pagination";
import {useStore} from "vuex";
import {ref, computed} from "vue";
import {useRoute} from "vue-router";

export default {
  components: {
    Pagination,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const pageParam = ref(route.query.page);
    const posts = computed(() => store.state.userPosts.posts);
    const pageNum = computed(() => store.state.userPosts.page);
    const totalPages = computed(() => store.state.userPosts.totalPages);

    const setPaginationParam = (page) => {
      pageParam.value = page;
    }

    const pageParamResolver = (page) => {
      // pageParam이 undefined일 경우, page값이 NAN이 되는 것을 방지하기 위한 방어코드.
      if (!pageParam.value) {
        return 0;
      }
      return page;
    }

    const getPostsByNickname = (page = 0) => {
      store.dispatch("userPosts/getPostsByNickname", {page})
    };

    getPostsByNickname(pageParamResolver(pageParam.value-1));

    return {
      posts,
      pageNum,
      totalPages,
      setPaginationParam,
    }
  }
}
</script>

<style scoped>
.info-title {
  font-size: 20px;
  border-bottom: #8977AD solid 2px;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.post-list thead {
  border-bottom: #8977AD solid 1px;
  text-align: center;
}

.post-list tbody tr td {
  border-bottom: #D3D3D3 solid 1px;
}

tbody tr td.post-title {
  text-align: left;
}

.post-board {
  width: 10%;
  padding: 8px;
}

.post-title {
  width: 72%;
  padding: 6px;
  display: table-cell;
}

.post-title a {
  display: flex;
}

.post-title div {
  margin-right: 6px;
}

.post-title div:last-child {
  color: #8977AD;
  margin-right: 0;
}

.post-create_date {
  width: 6%;
  padding: 6px;
}

.post-like_count {
  width: 12%;
  padding: 6px;
}
</style>