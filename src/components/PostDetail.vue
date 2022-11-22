<template>
  <div class="row">
    <div class="col-12">
      <h3 class="post-category">
        {{ postDetail.postCategory }}
      </h3>
      <div class="post-title">
        <h1>{{ postDetail.title }}</h1>
        <span>{{ postDetail.createdDate }}</span>
      </div>
      <div class="post-info">
        <div class="post-writer">
          <span>{{ postDetail.nickname }}</span>
        </div>
        <div class="post-hit">
           <span>
            조회 수
            <b>{{ postDetail.hits }}</b>
          </span>
          <span>
            좋아요 수
            <b>{{ postDetail.likeCount }}</b>
          </span>
          <span>
            댓글 수
            <b>{{ postDetail.commentCount }}</b>
          </span>
        </div>
      </div>
      <div class="post-content" v-html="postDetail.content" />
      <div class="post-reaction">
        <a @click = "addLikeCount(postDetail.postId)"
          class="post-like-button"
        >
          <span class="post-like-count">
            {{postDetail.likeCount}}
          </span>
        </a>
      </div>
      <div v-if="isWriter(postDetail.nickname)" class="post-edit">
        <h3>
          <router-link
              :to="`/community/${boardId}/edit?category=${postDetail.postCategoryId}&postId=${postDetail.postId}&mode=update`">
          수정
          </router-link>
        </h3>
        <h3>
          <button type="button"
                  @click="deletePost"
          >
          삭제
          </button>
        </h3>
      </div>
      <div class="comment-list-header">
        <h3>댓글</h3>
        <span>({{ postDetail.commentCount }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const postId = route.params.postId;
    const boardId = route.params.boardId;
    const postDetail = ref(computed(() => store.state.postDetail.postDetail));

    const loggedIn = computed(() => store.getters.login.loggedIn);
    const nickname = computed(() => store.state.login.nickname);

    const getPostDetails = async () => {
      await store.dispatch("postDetail/getPostDetails", {
        id: postId
      });
    }

    const addLikeCount = async () => {
      await store.dispatch("postDetail/addLikeCount", {
        id: postId
      }).then(() => {
        getPostDetails();
      });
    }

    const isWriter = (object) => {
      return nickname.value === object
    }

    const deletePost = async () => {
      const agree = confirm("글을 삭제하시겠습니까?");

      if (agree) {
        await store.dispatch("postDetail/deletePost", {
          postId,
          boardId,
        })
      }
    }

    getPostDetails();

    return {
      boardId,
      loggedIn,
      postDetail,
      isWriter,
      getPostDetails,
      addLikeCount,
      deletePost,
    }
  },
}
</script>

<style lang="scss" scoped>
.post-category {
  font-size: 14px;
  padding: 8px 16px;
  border-bottom: $TERTIARY_COLOR solid 1px;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 12px 16px;
  border-bottom: $TERTIARY_COLOR solid 1px;
  width: 100%;

  h1 {
    font-size: 24px;
    max-width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: 14px;
    line-height: 29px;
  }
}

.post-info {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: $TERTIARY_COLOR solid 1px;

  .post-writer {
    font-size: 14px;
  }

  .post-hit {
    display: block;
    align-content: center;
    font-size: 14px;
    line-height: 20px;

    span {
      font-size: 13px;
      padding: 0 6px;
    }
  }
}

::v-deep(.post-content) {
  padding: 16px;

  * + * {
    margin-top: 0.75em;
  }

  &:focus {
    outline: none;
  }

  ul, ol {
    padding: 0 1rem;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  h1, h2, h3 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(97, 97, 97, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(13, 13, 13, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(13, 13, 13, 0.1);
    margin: 2rem 0;
  }

  a {
    color: #1a0dab;
  }
}

.post-reaction {
  display: flex;
  justify-content: center;

  .post-like-button {
    display: flex;
    border: $TERTIARY_COLOR solid 1px;
    border-radius: 4px;
    padding: 12px 20px;
    cursor: pointer;

    .post-like-count {
      font-size: 16px;
      color: $EMPHASIS_COLOR;

      &:before {
        display: inline-block;
        content: "";
        background-image: url("../assets/images/thumb_up_black_24dp.svg");
        background-repeat: no-repeat;
        background-size: 100%;
        width: 24px;
        height: 21px;
        margin-right: 4px;
      }
    }
  }
}

.post-edit {
  display: flex;
  justify-content: right;

  h3 {
    font-size: 14px;
    margin-right: 8px;
    border: $TERTIARY_COLOR solid 1px;
    border-radius: 8px;
    padding: 4px;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: $PRIMARY_COLOR;
      background-color: $SECONDARY_COLOR;
      border: $SECONDARY_COLOR solid 1px;
    }
  }
}

.comment-list-header {
  display: flex;
  padding: 8px;
  border-bottom: $TERTIARY_COLOR solid 1px;

  h3 {
    font-size: 15px;
    margin-top: 2px;
  }

  span {
    font-size: 15px;
  }

}
</style>