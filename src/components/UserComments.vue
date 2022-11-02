<template>
  <h2 class="info-title">
    댓글
  </h2>
  <table class="comment-list">
    <thead>
      <tr>
        <th scope="col" class="comment-num">
          번호
        </th>
        <th scope="col" class="comment-board">
          게시판
        </th>
        <th scope="col" class="comment-content">
          내용
        </th>
        <th scope="col" class="comment-create_date">
          날짜
        </th>
        <th scope="col" class="comment-like_count">
          좋아요
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="comment in comments"
          :key="comment.commentId"
      >
        <td class="comment-num">
          {{comment.commentId}}
        </td>
        <td class="comment-board">
          {{ comment.boardTitle }}
        </td>
        <td class="comment-content">
          <router-link
              :to="`/community/${comment.boardId}/${comment.postId}`"
          >
            <div>
              {{ comment.content }}
            </div>
          </router-link>
        </td>
        <td class="comment-create_date">
          {{ comment.createdDate }}
        </td>
        <td class="comment-like_count">
          {{ comment.likeCommentCount }}
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
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref, computed} from "vue";

export default {
  components: {
    Pagination,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const pageParam = ref(route.query.page);
    const comments = computed(() => store.state.userComments.comments);
    const pageNum = computed(() => store.state.userComments.page);
    const totalPages = computed(() => store.state.userComments.totalPages);

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
      store.dispatch("userComments/getCommentsByNickname", {page})
    };

    getPostsByNickname(pageParamResolver(pageParam.value-1));

    return {
      comments,
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

.comment-list {
  text-align: center;
  font-size: 14px;
  width: 100%;
  table-layout: fixed;

  thead {
    border-bottom: $TERTIARY_COLOR solid 1px;

    tr {
      .comment-num {
        width: 8%;
      }
      .comment-board {
        width: 16%;
      }
      .comment-content {
        width: 60%;
      }
      .comment-create_date {
        width: 8%;
      }
      .comment-like_count {
        width: 8%;
      }
    }
  }

  tbody {
    tr {
      td {
        border-bottom: $TERTIARY_COLOR solid 1px;
      }

      .comment-content {
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
      }
    }
  }
}
</style>