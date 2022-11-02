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
    const postDetail = ref(computed(() => store.state.postDetail.postDetail));

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

    getPostDetails();

    return {
      postDetail,
      getPostDetails,
      addLikeCount,
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

  a {
    color: #1a0dab;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(13, 13, 13, 0.1);
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