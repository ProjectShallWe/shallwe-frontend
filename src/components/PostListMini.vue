<template>
  <div class="col-6">
    <h2 class="board-title">
      {{ recommendPostList.boardTitle }}
    </h2>
    <ul class="board-recommend">
        <h3 v-if="recommendPostList.recommendPosts === 0">
          추천글이 없습니다.
        </h3>
      <li v-for="post in recommendPostList.recommendPosts"
          :key="post.postId"
          class="recommend-post"
      >
        <router-link
            :to="`/community/${post.boardId}/${post.postId}`"
        >
          <div class="recommend-postCategory">
            {{ post.postCategory }}
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

    return {
      recommendPostList,
    }
  },
}
</script>

<style scoped>
.board-title {
  text-align: center;
  border-bottom: #8977AD solid 1px;
  color: #000000;
  font-size: 18px;
  padding: 10px 8px;
}

.board-recommend h3 {
  padding: 8px 0;
  font-size: 14px;
  color: #000000;
  text-align: center;
}

.recommend-post a {
  display: flex;
  font-size: 14px;
  padding: 10px 8px;
}

.recommend-post a div {
  width: auto;
  display: block;
}

.recommend-postCategory {
  color: #8977AD;
  margin-right: 10px;
}

.recommend-title {
  margin-right: 6px;
}

.recommend-commentCount {
  color: #8977AD;
}
</style>