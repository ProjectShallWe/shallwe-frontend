<template>
  <header>
    <div class="row">
      <div class="col-2">
        <h1 class="community-title">
          <a :href="`/community`">
            <strong>
              ShallWe
            </strong>
          </a>
        </h1>
      </div>
      <div class="col-3 community-search">
        <form action="" method="get">
          <input type="email" placeholder="커뮤니티 통합 검색">
          <button type="button">검색</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
}

.community-title {
  font-size: 32px;
  font-style: italic;
  color: #8977AD;
}

.community-search {
  margin: auto 0;
}

.community-search form {
  display: flex;
}

.community-search input {
  height: 40px;
  width: 100%;
  border: #D3D3D3 solid 2px;
  border-radius: 8px;
  margin-right: 8px;
}

.community-search button {
  height: 40px;
  width: 80px;
  border-radius: 8px;
  color: #FFFFFF;
  background-color: #8977AD;
}
</style>