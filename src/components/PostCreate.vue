<template>
  <div class="row">
    <div class="col-12">
      <div class="post-write">
        <h1 class="post-write-title">
          글쓰기
        </h1>
        <form action="" method="post">
          <div class="post-title">
            <select>
              <option>카테고리 선택</option>
              <option>축구1</option>
              <option>축구2</option>
              <option>축구3</option>
            </select>
            <input type="text" name="title">
          </div>
          <div class="post-content">
            <textarea placeholder="글을 작성해주세요!"/>
          </div>
          <div class="button-group">
            <button type="button" class="button-cancel">취소</button>
            <button type="submit" class="button-submit">작성완료</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCreate"
}
</script>

<style scoped>
.post-write-title {
  font-size: 18px;
  padding: 8px 0;
}

.post-title {
  display: flex;
  padding: 8px 0;
}

.post-title select {
  margin-right: 8px;
}

.post-title input {
  width: 100%;
  border: #D3D3D3 solid 1px;
}

.post-content {
  padding: 8px 0;
}
.post-content textarea {
  width: 100%;
  height: 500px;
  border: #D3D3D3 solid 1px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.button-group button {
  border-radius: 8px;
  padding: 8px;
}

.button-group .button-submit {
  color: #FFFFFF;
  background-color: #8977AD;
}
</style>