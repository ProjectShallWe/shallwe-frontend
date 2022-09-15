<template>
  <div class="col-6">
    <h2 class="board-title">
      {{ $props.recommendPosts.boardTitle }}
    </h2>
    <ul class="board-recommend">
      <li v-for="post in $props.recommendPosts.recommendPosts"
          :key="post.postId"
          class="recommend-post"
      >
        <a
            :href="`/community/${post.boardId}/${post.postId}`"
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
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    recommendPosts: {
      type: Object,
      required: true,
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
  margin-right: 8px;
}
</style>