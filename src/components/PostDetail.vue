<template>
  <div class="row">
    <div class="col-12">
      <h3 class="post-category">
        포스트 카테고리
      </h3>
      <div class="post-title">
        <h1>글 제목쓰기</h1>
        <span>2022.08.25.16:54</span>
      </div>
      <div class="post-info">
        <div class="post-writer">
          <span>닉네임자리</span>
        </div>
        <div class="post-hit">
          <span>
            좋아요 수
            <b>13</b>
          </span>
          <span>
            댓글 수
            <b>12</b>
          </span>
        </div>
      </div>
      <div class="post-content">
        <p>
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
          글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용글 내용
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostDetail"
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
  padding: 0 6px;
}

.post-info {
  display: flex;
  justify-content: space-between;
}

.post-content {
  padding: 16px 0;
}

</style>