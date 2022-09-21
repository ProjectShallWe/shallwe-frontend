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
      <div class="comment-list-header">
        <h3>댓글</h3>
        <span>({{ postDetail.commentCount }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import {ref} from "vue";
import {useRoute} from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const postId = route.params.postId;
    const postDetail = ref([]);

    const getPostDetails = async () => {
      const res = await axios.get(
          `api/post/${postId}`
      );
      postDetail.value = res.data
    }

    getPostDetails();

    return {
      getPostDetails,
      postDetail,
    }
  },
}
</script>

<style scoped>
.post-category {
  font-size: 16px;
  padding: 8px 0;
  border-bottom: #D3D3D3 solid 1px;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 12px 0;
  border-bottom: #D3D3D3 solid 1px;
  width: 100%;
}

.post-title h1 {
  font-size: 24px;
}

.post-title span {
  font-size: 14px;
  line-height: 29px;
  /*display: block;*/
}

.post-info {
  padding: 8px 0;
  border-bottom: #D3D3D3 solid 1px;
}

.post-writer {
  font-size: 14px;
}

.post-hit {
  display: block;
  align-content: center;
  font-size: 14px;
  line-height: 20px;
}

.post-hit span {
  font-size: 13px;
  padding: 0 6px;
}

.post-info {
  display: flex;
  justify-content: space-between;
}

.post-content {
  padding: 16px 0;
}

.comment-list-header {
  display: flex;
  padding: 8px 0;
  border-bottom: #D3D3D3 solid 1px;
}

.comment-list-header h3,
.comment-list-header span {
  font-size: 15px;
}

.comment-list-header h3 {
  margin-top: 2px;
}

</style>