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
        <th scope="col" class="post-hits">
          조회 수
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
          <router-link
              :to="`/community/${post.boardId}/${post.postId}`"
          >
            <div>
              {{ post.title }}
            </div>
            <div class="post-comment-count">
              [{{ post.commentCount }}]
            </div>
          </router-link>
        </td>
        <td class="post-create_date">
          {{ post.createdDate }}
        </td>
        <td class="post-hits">
          {{ post.hits }}
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

    getPostsByNickname(pageParamResolver(pageParam.value - 1));

    return {
      posts,
      pageNum,
      totalPages,
      setPaginationParam,
    }
  }
}
</script>

<style lang="scss" scoped>
.info-title {
  font-size: 20px;
  border-bottom: $TERTIARY_COLOR solid 2px;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.post-list {
  text-align: center;
  font-size: 14px;
  width: 100%;
  table-layout: fixed;

  thead {
    border-bottom: $TERTIARY_COLOR solid 1px;

    tr {
      .post-num {
        width: 8%;
      }
      .post-board {
        width: 16%;
      }
      .post-title {
        width: 52%;
      }
      .post-create_date {
        width: 8%;
      }
      .post-hits {
        width: 8%;
      }
      .post-like_count {
        width: 8%;
      }
    }
  }

  tbody {
    tr {
      td {
        border-bottom: $TERTIARY_COLOR solid 1px;
      }

      .post-title {
        text-align: left;

        a {
          display: flex;

          div {
            max-width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        div {
          margin-right: 6px;

          &:last-child {
            color: $POINT_COLOR;
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>