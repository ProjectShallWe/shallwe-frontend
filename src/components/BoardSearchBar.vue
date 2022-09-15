<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <form
          @submit.prevent="search"
      >
        <select name="type">
          <option value="ticon">제목+내용</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="nickname">닉네임</option>
        </select>
        <input type="text" name="keyword">
        <button type="submit">검색</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

    return {

    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  padding: 16px;
}

input {
  height: 40px;
  width: 100%;
  border: #D3D3D3 solid 2px;
  border-radius: 8px;
  margin-right: 8px;
}

select {
  margin-right: 8px;
}

button {
  height: 40px;
  width: 80px;
  border-radius: 8px;
  color: #FFFFFF;
  background-color: #8977AD;
}
</style>