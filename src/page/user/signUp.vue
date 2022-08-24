<template>
  <div class="row">
    <div class="col-2">
      <div class="wrapper">
        <h1>회원가입</h1>
        <form action="" method="post">
          <input type="email" placeholder="이메일 주소">
          <input type="password" placeholder="비밀번호 (8자리 이상)">
          <input type="text" placeholder="닉네임">
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  /* 항상 화면 정중앙에 배치*/
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: #D3D3D3 solid 2px;
  width: 280px;
  height: 420px;
  padding: 20px;
}

.wrapper h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.wrapper form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper input,
.wrapper button {
  height: 40px;
  width: 100%;
}

.wrapper input {
  font-size: 12px;
  border: #D3D3D3 solid 1px;
  color: #D3D3D3;
  margin-bottom: 8px;
}

.wrapper button {
  font-size: 16px;
  color: #FFFFFF;
  background-color: #8977AD;
  border-style: none;
  margin-bottom: 16px;
}

.wrapper button:hover {
  opacity: 0.8;
}
</style>