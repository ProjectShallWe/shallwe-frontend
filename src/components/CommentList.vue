<template>
  <div class="row">
    <div class="col-12">
      <ul class="comment-list">
        <!-- 댓글 작성 양식 -->
        <li v-if="loggedIn"
             class="reply-write-form"
        >
          <h3>댓글 작성</h3>
          <form
              @submit.prevent="writeParentComment"
              class="reply-write-content"
          >
            <div class="reply-content">
              <textarea
                  v-model="parentContent"
                  placeholder="댓글을 작성해주세요."
              />
            </div>
            <div class="reply-bottom">
              <button type="submit">등록</button>
            </div>
          </form>
        </li>
        <!-- post 내 작성된 댓글이 없을 때 -->
        <li v-if="isEmpty(commentList)"
            class="empty"
        >
          작성된 댓글이 없습니다. 첫 댓글을 남겨주세요.
        </li>
        <!-- 댓글 보여주기 -->
        <li v-for="comment in commentList"
            :key="comment.commentId"
            class="comment">
          <div class="comment-wrapper">
            <div class="comment-info">
              <div>
                <span class="comment-writer">{{ comment.nickname }}</span>
                <span class="comment-created-date">({{ comment.createdDate }})</span>
                <span v-if="isWriter(comment.nickname, comment.status)"
                      @click="deleteComment(comment.commentId)"
                      class="comment-delete-button">삭제</span>
              </div>
              <div v-if="comment.status === 'ENABLE'" class="comment-reaction">
                <div @click="addLikeCount(comment.commentId)"
                     class="comment-like-button">
                  <span class="comment-like-count">
                    {{ comment.likeCommentCount }}
                  </span>
                </div>
              </div>
            </div>
            <div class="comment-content">
              <p v-html="getContent(comment.content)"></p>
            </div>
            <div class="reply-line">
              <button
                  v-if="loggedIn"
                  @click="showReplyWriteForm(comment)"
                  type="button"
              >
                답글
              </button>
            </div>
          </div>
          <!-- 답글 작성 양식 -->
          <div
              v-if="comment.isShowReplyWriteForm && loggedIn"
              class="reply-write-form"
          >
            <h3>답글 작성</h3>
            <form
                @submit.prevent="writeChildComment(comment.commentId)"
                class="reply-write-content"
            >
              <div class="reply-content">
                <textarea
                    v-model="childContent"
                    placeholder="답글을 작성해주세요."
                />
              </div>
              <div class="reply-bottom">
                <button type="submit">등록</button>
              </div>
            </form>
          </div>
          <!-- 대댓글 보여주기 -->
          <ul v-if="!isEmpty(comment.childComments)"
              class="reply-list">
            <li
                v-for="reply in comment.childComments"
                :key="reply.commentId"
                class="reply"
            >
              <div class="reply-wrapper">
                <div class="comment-info">
                  <div>
                    <span class="comment-writer">{{ reply.nickname }}</span>
                    <span class="comment-created-date">({{ reply.createdDate }})</span>
                    <span v-if="isWriter(reply.nickname, reply.status)"
                          @click="deleteComment(reply.commentId)"
                          class="comment-delete-button">삭제</span>
                  </div>
                  <div v-if="reply.status === 'ENABLE'" class="comment-reaction">
                    <div @click="addLikeCount(reply.commentId)"
                         class="comment-like-button">
                    <span class="comment-like-count">
                      {{ reply.likeCommentCount }}
                    </span>
                    </div>
                  </div>
                </div>
                <div class="comment-content">
                  <p v-html="getContent(reply.content)"></p>
                </div>
                <div class="reply-line">
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import store from "@/store";

export default {
  setup() {
    const route = useRoute();
    const postId = route.params.postId;
    const commentList = ref(computed(() => store.state.commentList.comments));
    const parentContent = ref("");
    const childContent = ref("");

    const loggedIn = computed(() => store.getters["login/loggedIn"]);

    const nickname = computed(() => store.state.login.nickname);

    const isWriter = (writer, status) => {
      return nickname.value === writer && status === "ENABLE";
    }

    const deleteComment = async (commentId) => {
      const agree = confirm("댓글을 삭제하시겠습니까?")

      if (agree) {
        await store.dispatch("commentList/deleteComment", {
          id: commentId,
        })
        await getCommentsInPost();
      }
    }

    const isEmpty = (list) => {
      const arr = list;
      return Array.isArray(arr) && arr.length === 0;
    }

    const addIsShowReplyForm = () => {
      for (const comment of commentList.value) {
        comment.isShowReplyWriteForm = false;
      }
    };

    const showReplyWriteForm = (comment) => {
      // 만약 답글 작성 창이 열려 있으면 닫아준다.
      if (!comment.isShowReplyWriteForm) {
        addIsShowReplyForm();
      }
      // 이후 현재 답글 작성 창을 토글로 열고 닫는다.
      return comment.isShowReplyWriteForm = !comment.isShowReplyWriteForm;
    };

    const getCommentsInPost = async () => {
      await store.dispatch("commentList/getCommentsInPost", {
        id: postId,
      });
      addIsShowReplyForm();
    };

    const writeParentComment = async () => {
      await store.dispatch("commentList/writeParentComment", {
        id: postId,
        content: parentContent.value,
      }).then(() => {
        parentContent.value = "";
        getCommentsInPost()
      });
    };

    const writeChildComment = async (commentId) => {
      await store.dispatch("commentList/writeChildComment", {
        postId,
        commentId,
        content: childContent.value,
      }).then(() => {
        childContent.value = "";
        getCommentsInPost();
      });
    };

    const getContent = (content) => {
      return content.split('\n').join('<br>');
    };

    const addLikeCount = async (commentId) => {
      await store.dispatch("commentList/addLikeCount", {
        commentId
      }).then(() => {
        getCommentsInPost();
      });
    };

    getCommentsInPost();

    return {
      commentList,
      parentContent,
      childContent,
      loggedIn,
      isWriter,
      isEmpty,
      deleteComment,
      getCommentsInPost,
      showReplyWriteForm,
      writeParentComment,
      writeChildComment,
      getContent,
      addLikeCount
    }
  },
}
</script>

<style lang="scss" scoped>

.comment-list {
  margin-bottom: 24px;

  .reply-write-form {
    background-color: #F8F8F8;

    h3 {
      display: block;
      font-size: 14px;
      padding: 16px 16px 0 16px;
    }

    .reply-write-content {
      align-items: center;
      padding: 16px;

      .reply-content {
        textarea {
          width: 100%;
          height: 100px;
          font-size: 14px;
          margin-bottom: 8px;
          padding: 8px;
        }
      }

      .reply-bottom {
        display: flex;
        justify-content: right;

        button {
          font-size: 13px;
          height: 25px;
          width: 40px;
          color: $PRIMARY_COLOR;
          background-color: $SECONDARY_COLOR;
          border-radius: 8px;
        }
      }
    }
  }

  .empty {
    text-align: center;
    padding: 24px 0;
    border-top: #D3D3D3 solid 1px;
    border-bottom: #D3D3D3 solid 1px;
  }

  .comment {
    border-bottom: #D3D3D3 solid 1px;

    .comment-wrapper {
      padding: 16px
    }

    .reply-list {
      padding: 16px 16px 16px 36px;
      background-color: #F8F8F8;
    }
  }

  .comment-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    div {
      .comment-writer {
        font-size: 14px;
        margin-right: 8px;
      }

      .comment-created-date {
        font-size: 12px;
        margin-right: 8px;
      }

      .comment-delete-button {
        font-size: 0.75rem;

        &:hover {
          color: $EMPHASIS_COLOR;
        }
      }
    }

    .comment-reaction {
      display: flex;
      align-content: center;

      .comment-like-button {
        display: flex;
        border: #C34747 solid 1px;
        border-radius: 8px;
        padding: 2px;
        cursor: pointer;

        .comment-like-count {
          font-size: 12px;

          &:before {
            display: inline-block;
            content: "";
            background-image: url("../assets/images/thumb_up_black_24dp.svg");
            background-repeat: no-repeat;
            background-size: 100%;
            width: 14px;
            height: 12px;
            margin-right: 4px;
          }
        }
      }
    }
  }

  .comment-content {
    font-size: 14px;

    p {
      width: 100%;
    }
  }

  .reply-list {
    padding-left: 36px;
    background-color: #F8F8F8;
  }

  .reply-line {
    display: flex;
    justify-content: right;
    font-size: 11px;

    button {
      color: #D3D3D3;
      background-color: #FFFFFF;
    }
  }
}

</style>