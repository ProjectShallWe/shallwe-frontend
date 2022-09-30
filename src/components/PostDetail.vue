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
import axios from "@/axios";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const postId = route.params.postId;
    const postDetail = ref([]);

    const getPostDetails = async () => {
      const res = await axios.get(
          `api/post/${postId}`
      );
      postDetail.value = res.data
    }

    const addLikeCount = async () => {
      const agree = confirm("해당 글에 공감하시겠습니까?");
      if (agree) {
        await store.dispatch("postDetail/addLikeCount", {
          postId
        }).then(() => {
          getPostDetails();
        });
      }
    }

    getPostDetails();

    return {
      getPostDetails,
      postDetail,
      addLikeCount,
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

.post-reaction {
  display: flex;
  justify-content: center;
}

.post-like-button {
  display: flex;
  border: #D3D3D3 solid 1px;
  border-radius: 4px;
  padding: 12px 20px;
  cursor: pointer;
}

.post-like-count {
  font-size: 16px;
  color: #C34747;
}

.post-like-count::before {
  display: inline-block;
  content: "";
  background-image: url("../assets/thumb_up_black_24dp.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 24px;
  height: 21px;
  margin-right: 4px;
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