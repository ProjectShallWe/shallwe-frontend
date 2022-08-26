<template>
  <div class="row">
    <div class="col-12">
      <div class="comment-list-header">
        <h3>댓글</h3>
        <span>(17)</span>
      </div>
      <ul class="comment-list">
        <li class="comment">
          <div class="comment-info">
            <div>
              <span class="comment-writer">글 작성자</span>
              <span class="comment-created-date">2022-08-25 09:05:27</span>
            </div>
            <div class="comment-reaction">
              <span class="comment-like">like button</span>
            </div>
          </div>
          <div class="comment-content">
            <p>
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
              댓글이 자연스럽게 줄바꿈되는지 확인합니다.
            </p>
          </div>
          <div class="reply-line">
            <button type="button">답글</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList"
}
</script>

<style scoped>
.comment-list-header {
  display: flex;
  padding: 8px 0;
  border-bottom: #D3D3D3 solid 1px;
}

.comment {
  border-bottom: #D3D3D3 solid 1px;
}

.comment-info {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.comment-writer {
  padding-right: 8px;
}
.comment-content {
  padding: 8px 0;
}

.comment-content p {
  width: 100%;
}

.reply-line {
  display: flex;
  justify-content: right;
}


</style>