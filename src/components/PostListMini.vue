<template>
  <div class="col-6">
    <div class="wrapper">
      <h2 class="board-title">
        {{ recommendPostList.boardTitle }}
      </h2>
      <ul class="board-recommend">
        <li class="empty"
            v-if="isEmpty()"
        >
          추천글이 없습니다.
        </li>
        <li v-for="post in recommendPostList.recommendPosts"
            :key="post.postId"
            class="recommend-post"
        >
          <router-link
              :to="`/community/${post.boardId}/${post.postId}`"
          >
            <div class="recommend-postCategory">
              [{{ post.postCategory }}]
            </div>
            <div class="recommend-title">
              {{ post.title }}
            </div>
            <div class="recommend-commentCount">
              [{{ post.commentCount }}]
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    recommendPosts: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const recommendPostList = ref(props.recommendPosts);


    const isEmpty = () => {
      const arr = recommendPostList.value.recommendPosts;
      return Array.isArray(arr) && arr.length === 0;
    }

    return {
      recommendPostList,
      isEmpty,
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 16px;
  border-bottom: $TERTIARY_COLOR solid 1px;

  .board-title {
    text-align: center;
    border-bottom: $TERTIARY_COLOR solid 1px;
    font-size: 18px;
    padding: 8px 0;
  }

  .board-recommend {
    display: block;
    min-height: 200px;

    .empty {
      line-height: 200px;
      padding: 8px 0;
      font-size: 14px;
      text-align: center;
    }

    .recommend-post {
      a {
        display: flex;
        font-size: 14px;
        padding: 8px 0;

        .recommend-postCategory {
          color: $POINT_COLOR;
          margin-right: 8px;
        }

        .recommend-title {
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 8px;
        }

        .recommend-commentCount {
          font-size: 12px;
          color: $POINT_COLOR;
        }
      }
    }
  }
}
</style>