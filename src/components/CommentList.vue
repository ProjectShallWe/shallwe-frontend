<template>
  <div class="row">
    <div class="col-12">
      <ul class="comment-list">
        <div v-if="loggedIn"
             class="reply-write-form"
        >
          <h3>댓글 작성</h3>
          <form
              @submit.prevent="writeParentComment"
              class="reply-write-content"
          >
            <textarea
                v-model="parentContent"
                placeholder="댓글을 작성해주세요."
            />
            <button type="submit">등록</button>
          </form>
        </div>
        <li v-for="comment in commentList"
            :key="comment.commentId"
            class="comment">
          <div class="comment-info">
            <div>
              <span class="comment-writer">{{ comment.nickname }}</span>
              <span class="comment-created-date">({{ comment.createdDate }})</span>
            </div>
            <div class="comment-reaction">
              <span class="comment-like">like button</span>
            </div>
          </div>
          <div class="comment-content">
            <p v-html="getContent(comment.content)"></p>
          </div>
          <div class="reply-line">
            <button
                @click="showReplyWriteForm(comment)"
                type="button"
            >
              답글
            </button>
          </div>
          <div
              v-if="comment.isShowReplyWriteForm && loggedIn"
              class="reply-write-form"
          >
            <h3>댓글 작성</h3>
            <form
                @submit.prevent="writeChildComment(comment.commentId)"
                class="reply-write-content"
            >
              <textarea
                  v-model="childContent"
                  placeholder="댓글을 작성해주세요."
              />
              <button type="submit">등록</button>
            </form>
          </div>
          <ul class="reply-list">
            <li
                v-for="reply in comment.childComments"
                :key="reply.commentId"
                class="reply"
            >
              <div class="reply-info">
                <div>
                  <span class="reply-writer">{{ reply.nickname }}</span>
                  <span class="reply-created-date">({{ reply.createdDate }})</span>
                </div>
                <div class="reply-reaction">
                  <span class="reply-like">like button</span>
                </div>
              </div>
              <div class="reply-content">
                <p v-html="getContent(reply.content)"></p>
              </div>
              <div class="reply-line">
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
import axios from "@/axios";
import store from "@/store";

export default {
  setup() {
    const route = useRoute();
    const postId = route.params.postId;
    const commentList = ref([]);
    const parentContent = ref("");
    const childContent = ref("");

    const loggedIn = computed(() => store.getters["login/loggedIn"]);

    const addIsShowReplyForm = () => {
      for (const comment of commentList.value) {
        comment.isShowReplyWriteForm = false;
      }
    }

    const getCommentsInPost = async () => {
      const res = await axios.get(
          `api/comment?post=${postId}`
      );
      commentList.value = res.data
      addIsShowReplyForm();
    };

    getCommentsInPost();

    const showReplyWriteForm = (comment) => {
      if (!comment.isShowReplyWriteForm) {
        addIsShowReplyForm();
      }
        return comment.isShowReplyWriteForm = !comment.isShowReplyWriteForm;
    };

    const writeParentComment = async () => {
     await axios.post(
          `api/comment?post=${postId}`, {
            content: parentContent.value,
          },
         {
           headers: {
             Authorization: localStorage.getItem('userToken'),
           }
         }
      )
      parentContent.value = "";
      await getCommentsInPost();
    }

    const writeChildComment = async (commentId) => {
      await axios.post(
          `api/comment/${commentId}?post=${postId}`, {
            content: childContent.value,
          },
          {
            headers: {
              Authorization: localStorage.getItem('userToken'),
            }
          }
      )
      childContent.value = "";
      await getCommentsInPost();
    }

    const getContent = (content) => {
      return content.split('\n').join('<br>');
    }

    return {
      commentList,
      parentContent,
      childContent,
      loggedIn,
      getCommentsInPost,
      showReplyWriteForm,
      writeParentComment,
      writeChildComment,
      getContent,
    }
  },
}
</script>

<style scoped>
.comment {
  border-bottom: #D3D3D3 solid 1px;
}

.comment-info,
.reply-info {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.comment-writer,
.reply-writer {
  font-size: 14px;
  padding: 0 8px;
}

.comment-created-date,
.reply-created-date {
  font-size: 12px;
}

.comment-content,
.reply-content {
  font-size: 14px;
  padding: 8px;
}

.comment-content p,
.reply-content p {
  width: 100%;
}

.reply {
  border-top: #D3D3D3 solid 1px;
  background-color: #F8F8F8;
}

.reply-list {
  margin-left: 16px;
}

.reply-line {
  display: flex;
  justify-content: right;
  font-size: 11px;
  height: 28px;
}

.reply-line button {
  color: #D3D3D3;
  background-color: #FFFFFF;
}

.reply-write-form {
  background-color: #F8F8F8;
}

.reply-write-content {
  display: flex;
  align-items: center;
  padding: 16px;
}

.reply-write-form h3 {
  display: block;
  font-size: 13px;
  padding: 16px 16px 0 16px;
}

.reply-write-content textarea {
  width: 100%;
  height: 60px;
  margin-right: 16px;
}

.reply-write-content button {
  height: 60px;
  width: 60px;
  color: #FFFFFF;
  background-color: #8977AD;
  border-radius: 8px;
}

</style>